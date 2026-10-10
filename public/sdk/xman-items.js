/*
 * XMAN supporter items — drop-in client for games on xmangameshub.online/play/<id>/.
 *
 *   <script src="/sdk/xman-items.js"></script>
 *   const items = XmanItems.forGame("breaker");
 *   const r = await items.redeem(codeTypedByPlayer);   // { ok, item, message }
 *   if (items.owns("founder-badge")) showBadge();
 *
 * Supporters get codes at https://xman4289.com/games-support/my-items after the team
 * confirms their donation. One code works on a limited number of devices; this script
 * keeps a random device id and the unlocked items in localStorage. Items are cosmetic,
 * so a local save is enough — never gate gameplay power behind them.
 */
(function (global) {
  "use strict";
  var API = "https://xman4289.com/api/gameshub/redeem";

  function store(key, fallback) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : fallback;
    } catch {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // private mode or storage full: the unlock still works for this session's answer
    }
  }
  function deviceId() {
    var id = store("xman.items.device", null);
    if (!id) {
      var bytes = new Uint8Array(16);
      if (global.crypto && global.crypto.getRandomValues) {
        global.crypto.getRandomValues(bytes);
      } else {
        for (var i = 0; i < bytes.length; i++) bytes[i] = Math.random() * 256;
      }
      id = Array.prototype.map.call(bytes, function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
      save("xman.items.device", id);
    }
    return id;
  }

  function forGame(game) {
    var key = "xman.items." + game;
    return {
      /** Items this device has unlocked: { key: { name, kind, description, image_url } } */
      list: function () {
        return store(key, {});
      },
      owns: function (itemKey) {
        return Object.prototype.hasOwnProperty.call(store(key, {}), itemKey);
      },
      redeem: function (code) {
        return fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ game: game, code: String(code || ""), device: deviceId() }),
        })
          .then(function (r) {
            return r.json().catch(function () {
              return { ok: false, message: "เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้ง" };
            });
          })
          .then(function (body) {
            if (body && body.ok && body.item) {
              var owned = store(key, {});
              owned[body.item.key] = body.item;
              save(key, owned);
              body.message = "ได้รับ " + body.item.name + " แล้ว!";
            }
            return body;
          })
          .catch(function () {
            return { ok: false, error: "network", message: "เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้ง" };
          });
      },
    };
  }

  global.XmanItems = { forGame: forGame };
})(typeof window !== "undefined" ? window : this);
