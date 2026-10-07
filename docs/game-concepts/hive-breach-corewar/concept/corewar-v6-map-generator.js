(function (scope) {
  "use strict";
  const W = 40, H = 26;
  function random(seed) {
    let state = seed >>> 0;
    return function () {
      state += 0x6D2B79F5;
      let t = state;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function near(id) {
    const x = id % W, y = Math.floor(id / W), out = [];
    if (x > 0) out.push(id - 1);
    if (x < W - 1) out.push(id + 1);
    if (y > 0) out.push(id - W);
    if (y < H - 1) out.push(id + W);
    return out;
  }
  function distances(map, start, allowed) {
    const d = new Int32Array(W * H).fill(-1), queue = [start];
    d[start] = 0;
    for (let n = 0; n < queue.length; n++) {
      for (const id of near(queue[n])) {
        if (d[id] < 0 && map.floor[id] && (!allowed || allowed.has(id))) {
          d[id] = d[queue[n]] + 1; queue.push(id);
        }
      }
    }
    return d;
  }
  function sight(map, start, radius) {
    const out = new Set(), sx = start % W, sy = Math.floor(start / W);
    for (let ty = Math.max(0, sy-radius); ty <= Math.min(H-1, sy+radius); ty++) {
      for (let tx = Math.max(0, sx-radius); tx <= Math.min(W-1, sx+radius); tx++) {
        if ((tx-sx)**2+(ty-sy)**2 > radius**2) continue;
        let x=sx, y=sy, dx=Math.abs(tx-sx), dy=-Math.abs(ty-sy);
        const stepX=sx<tx?1:-1, stepY=sy<ty?1:-1;
        let error=dx+dy;
        while (true) {
          const id=y*W+x;
          out.add(id);
          if ((x===tx && y===ty) || (id!==start && !map.floor[id])) break;
          const doubled=2*error;
          if (doubled>=dy) {error+=dy;x+=stepX;}
          if (doubled<=dx) {error+=dx;y+=stepY;}
        }
      }
    }
    return out;
  }
  function generate(seed) {
    const rng=random(seed), integer=(a,b)=>a+Math.floor(rng()*(b-a+1));
    const floor=new Uint8Array(W*H), rooms=[], edges=[], edgeKeys=new Set();
    function carve(x,y,r=0) {
      for(let yy=y-r;yy<=y+r;yy++) for(let xx=x-r;xx<=x+r;xx++)
        if(xx>0&&xx<W-1&&yy>0&&yy<H-1) floor[yy*W+xx]=1;
    }
    for(let attempts=0;attempts<500&&rooms.length<13;attempts++) {
      const room={x:integer(5,W-6),y:integer(5,H-6),rx:integer(2,3),ry:integer(2,3)};
      if(rooms.some(other=>Math.abs(other.x-room.x)<other.rx+room.rx+2 &&
                               Math.abs(other.y-room.y)<other.ry+room.ry+2)) continue;
      rooms.push(room);
      for(let y=room.y-room.ry;y<=room.y+room.ry;y++)
        for(let x=room.x-room.rx;x<=room.x+room.rx;x++) carve(x,y);
    }
    if(rooms.length<5) throw new Error("Insufficient rooms");
    const square=(a,b)=>(a.x-b.x)**2+(a.y-b.y)**2;
    function connect(a,b) {
      const key=Math.min(a,b)+":"+Math.max(a,b);
      if(edgeKeys.has(key)||a===b) return;
      edgeKeys.add(key); edges.push([a,b]);
      let x=rooms[a].x,y=rooms[a].y;
      const ex=rooms[b].x,ey=rooms[b].y;
      const firstHorizontal=rng()<.5;
      while(x!==ex||y!==ey) {
        carve(x,y,1);
        if((firstHorizontal&&x!==ex)||y===ey) x+=Math.sign(ex-x);
        else y+=Math.sign(ey-y);
      }
      carve(ex,ey,1);
    }
    const linked=new Set([0]);
    while(linked.size<rooms.length) {
      let best=null;
      for(const a of linked) for(let b=0;b<rooms.length;b++)
        if(!linked.has(b)) {
          const score=square(rooms[a],rooms[b])*(.8+rng()*.4);
          if(!best||score<best.score) best={a,b,score};
        }
      connect(best.a,best.b); linked.add(best.b);
    }
    for(let i=0;i<rooms.length;i++) {
      const neighbors=rooms.map((room,j)=>({j,score:square(rooms[i],room)}))
        .filter(value=>value.j!==i).sort((a,b)=>a.score-b.score);
      neighbors.slice(0,3).forEach(value=>connect(i,value.j));
    }
    let pair=[0,1], far=-1;
    for(let a=0;a<rooms.length;a++) for(let b=a+1;b<rooms.length;b++) {
      const score=square(rooms[a],rooms[b])*(.95+rng()*.1);
      if(score>far) {far=score;pair=[a,b];}
    }
    if(rng()<.5) pair.reverse();
    const guardian=rooms[pair[0]].y*W+rooms[pair[0]].x;
    const alien=rooms[pair[1]].y*W+rooms[pair[1]].x;
    carve(guardian%W,Math.floor(guardian/W),4);
    carve(alien%W,Math.floor(alien/W),4);
    const map={seed:seed>>>0,width:W,height:H,floor,rooms,edges,guardian,alien,points:[]};
    const g=distances(map,guardian),a=distances(map,alien);
    if(g[alien]<22) throw new Error("Spawn separation too small");
    const reserved=new Set([guardian,alien]);
    for(const [side,own,enemy] of [["guardian",g,a],["alien",a,g]]) {
      const candidates=[];
      for(let id=0;id<floor.length;id++)
        if(floor[id]&&own[id]===6&&enemy[id]>=15&&!reserved.has(id)) candidates.push(id);
      if(candidates.length<2) throw new Error("Starting resource placement failed");
      for(let j=0;j<2;j++) {
        const slot=integer(0,candidates.length-1),id=candidates.splice(slot,1)[0];
        reserved.add(id);map.points.push({id,type:"resource",side,amount:100,distance:6});
      }
    }
    const interior=[];
    for(let id=0;id<floor.length;id++)
      if(floor[id]&&g[id]>9&&a[id]>9&&!reserved.has(id)) interior.push(id);
    for(const type of ["relay","relay","cache","cache","hazard"]) {
      if(!interior.length) break;
      const id=interior.splice(integer(0,interior.length-1),1)[0];
      reserved.add(id);map.points.push({id,type,side:"neutral"});
    }
    let hash=2166136261;
    for(const value of floor) hash=Math.imul(hash^value,16777619)>>>0;
    map.fingerprint=hash.toString(16);
    map.validation={connected:floor.every((value,id)=>!value||g[id]>=0),
      startingResourceDistanceEqual:true,basePathLength:g[alien]};
    return map;
  }
  function explore(map,position,seen,radius=4) {
    const d=distances(map,position,seen);
    let target=-1,best=0;
    for(let id=0;id<d.length;id++) {
      if(d[id]<0) continue;
      let gain=0;
      const x=id%W,y=Math.floor(id/W);
      for(let yy=Math.max(0,y-radius);yy<=Math.min(H-1,y+radius);yy++)
        for(let xx=Math.max(0,x-radius);xx<=Math.min(W-1,x+radius);xx++) {
          if((xx-x)**2+(yy-y)**2>radius**2||seen.has(yy*W+xx)) continue;
          let bx=x,by=y,dx=Math.abs(xx-x),dy=-Math.abs(yy-y),e=dx+dy,blocked=false;
          const sx=x<xx?1:-1,sy=y<yy?1:-1;
          while(bx!==xx||by!==yy) {
            const twice=2*e;
            if(twice>=dy) {e+=dy;bx+=sx;}
            if(twice<=dx) {e+=dx;by+=sy;}
            const cell=by*W+bx;
            if(seen.has(cell)&&!map.floor[cell]) {blocked=true;break;}
          }
          if(!blocked) gain++;
        }
      const score=gain/(1+d[id]*.25);
      if(d[id]>0&&score>best) {target=id;best=score;}
    }
    if(target<0) return position;
    const path=[target];
    while(path[path.length-1]!==position) {
      const last=path[path.length-1];
      const predecessor=near(last).find(id=>d[id]===d[last]-1);
      if(predecessor===undefined) throw new Error("Known route missing");
      path.push(predecessor);
    }
    return path[Math.max(0,path.length-4)];
  }
  const api={generate,distances,sight,explore,near,width:W,height:H};
  if(typeof module!=="undefined"&&module.exports) module.exports=api;
  else scope.CorewarMaps=api;
})(globalThis);
