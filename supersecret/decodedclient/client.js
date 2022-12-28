var userIP;

/*
var createScript = document.createElement("script");
createScript.setAttribute("src", "http://mope2.io/userIP.php?v=" + Math.random());
document.body.appendChild(createScript);
userIP = String(userIP)
*/
var gameVersion = 153,
    TestingMode = true;
var i = "localhost"; // 45.63.15.119
console.log('%c%s', 'color: red; font-size: 18px', "Mope2 copyright©");
console.log('%c%s', 'color: cyan; font-size: 20px', "Founder: abc64\nDevelopers: Maxim_MoPeR, Node13\nDesigner: ДевУшкА-БОЕЦ");
var n = 400,
    s = [],
    l = {
        USA: []
    };

function gameServer(t, e, a) {
    t = {
        name: t,
        ip: e,
        region: a,
        playersCount: -1,
        ping: 1e4,
        domOptionindex: 0
    };
    s.push(t);
    l[a].push(t);
    return t
}
if (TestingMode) {
    document.getElementById('nickInput').setAttribute("maxlength", "30")
    document.getElementById('experimental_Mode').style.display = 'block';
    region = "USA",
        console.log("TESTSERVER ACTIVATED!", region),
        gameServer("EXPERIMENTAL", "cbdc-178-71-66-224.ngrok.io", region);
        gameServer("LOCAL", "127.0.0.1:7020", "USA")
} else {
    document.getElementById('ffa_ModeTxt').style.display = 'block';
    region = "USA";
    console.log("FFA MODE ACTIVATED!", region),
        gameServer("SANDBOX", "517883c739bc.eu.ngrok.io", region);
    gameServer("SANDBOX 2", "517883c739bc.eu.ngrok.io", region);
}
var h = 2;

function c(t) {
    t = t.split("+").join(" ");
    for (var e = {}, a, i = /[?&]?([^=]+)=([^&]*)/g; a = i.exec(t);)
        e[decodeURIComponent(a[1])] = decodeURIComponent(a[2]);
    return e
}
var f = c(document.location.search),
    g = 0 < f.mobileios,
    u = 0 < f.mobileAndroid,
    p = g || u,
    y = false,
    m = 0 < f.videoson,
    w = 0 < f.nofullscr,
    b = false,
    I = f.s,
    P = f.l;
null != I && null != P && 5 < P.length && (b = !0);

function M(t) {
    this.serverObj = t;

    this.testWs = new WebSocket("ws://" + this.serverObj.ip);
    this.startT = +new Date;
    this.testWs.binaryType = "arraybuffer";
    var e = this;
    this.pingsDelayMsTot = this.pingsRec = 0;
    this.testWs.onopen = function() {
        e.sendPing()
    };
    this.sendPing = function() {
        var t = new MsgWriter(1);
        t.writeUInt8(255);
        e.testWs.send(t.dataView.buffer);
        this.startT = +new Date
    };
    this.testWs.onmessage = function(t) {
        t = new MsgReader(new DataView(t.data));
        255 == t.readUInt8() && (t = +new Date - e.startT,
            e.pingsRec += 1,
            e.pingsDelayMsTot += t,
            3 <= e.pingsRec ? (e.serverObj.ping = e.pingsDelayMsTot / e.pingsRec,
                e.testWs.close(),
                C(e)) : e.sendPing())
    }
}
var v = Ta(0, Math.max(0, s.length - 1 - h)),
    A = s[v],
    x = s[Math.max(0, Ta(0, s.length - 1 - h))],
    T = x.region,
    k = [],
    S = false,
    E;

function U() {
    if (!S) {
        S = !0;
        for (var t in l)
            l.hasOwnProperty(t) && 0 < l[t].length && k.push(new M(l[t][0]));
        E = setTimeout(function() {
            for (var t = 0; t < k.length; t++)
                k[t].testWs.close();
            D()
        }, 3e3)
    }
}

function C(t) {
    t.serverObj.ping < x.ping && (x = t.serverObj);
    t = k.indexOf(t); -
    1 != t && k.splice(t, 1);
    0 == k.length && (console.log("pingtest: all finished"),
        E && clearTimeout(E),
        D())
}

function D() {
    S = false;
    console.log("@@@@  Fastest region is " + x.region + " with ping " + x.ping + "ms ");
    var t = l[x.region].slice();
    t.sort(function(t, e) {
        return t.playersCount < e.playersCount ? 1 : t.playersCount > e.playersCount ? -1 : 0
    });
    for (var e = false, a = 0; a < t.length; a++)
        if (t[a].playersCount < n) {
            A = t[a];
            v = s.indexOf(A);
            e = !0;
            break
        }
    if (!e)
        for (a = 0; a < t.length; a++)
            if (t[a].playersCount < 2 * n) {
                A = t[a];
                v = s.indexOf(A);
                e = !0;
                break
            }
    e || (A = t[Ta(0, t.length - 1)],
        v = s.indexOf(A));
    T = x.region;
    ti();
    $a();
    console.log("Connecting to best server...");
    ii() && ws.close();
    Ka()
}
var B;

function _(t) {
    if (window.WebViewJavascriptBridge)
        return t(WebViewJavascriptBridge);
    if (window.WVJBCallbacks)
        return window.WVJBCallbacks.push(t);
    window.WVJBCallbacks = [t];
    var e = document.createElement("iframe");
    e.style.display = "none";
    e.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(e);
    setTimeout(function() {
        document.documentElement.removeChild(e)
    }, 0)
}
g && _(function(t) {
    B = t;
    t.registerHandler("testJavascriptHandler", function(t, e) {
        console.log("ObjC called testJavascriptHandler with", t);
        e({
            "Javascript Says": "Right back atcha!"
        })
    })
});

function O() {
    B && g && B.callHandler("adShowCallBack", {
        foo: "bar"
    }, function(t) {
        console.log("JS got response " + t)
    })
}

function R() {
    console.log("Showing ad android...");
    window.location = "myscheme://showAdmob"
}
var F = 0,
    L = 0;
if (window.localStorage)
    var W = 1 * window.localStorage.getItem("lastAdShowT") || 0,
        H = +new Date - W,
        L = 0 < H ? W : 0,
        F = 1 * window.localStorage.getItem("gamesSinceAd");
var G = 0,
    Y = +new Date,
    N = false;

function X() {
    return !y || p || "undefined" == typeof adplayer ? (console.log("preroll: no show: ads disabled"),
        false) : m ? (console.log("preroll: test mode, always show video ad!"), !0) : 1 > G && 0 == L ? (console.log("preroll: no show: NEW PLAYER, no games yet started!"),
        false) : 300 < (+new Date - L) / 1e3 && 0 < F ? (console.log("preroll: show: time limit passed!"), !0) : 3 <= F ? (console.log("preroll: show: 3+ games passed!"), !0) : false
}

function z() {
    "undefined" != typeof aipPlayer ? (console.log("Loading video preroll..."),
        adplayer = new aipPlayer({
            AD_WIDTH: 960,
            AD_HEIGHT: 540,
            AD_FULLSCREEN: false,
            PREROLL_EleM: document.getElementById("preroll"),
            AIP_COMPleTE: function() {
                console.log("Video ad finished.");
                N = false;
                F = 0;
                L = +new Date;
                if (window.localStorage)
                    try {
                        window.localStorage.setItem("lastAdShowT", L),
                            window.localStorage.setItem("gamesSinceAd", F)
                    } catch (t) {}
                bi()
            }
        })) : (console.log("Video ad (blocked) -finished."),
        N = false,
        bi())
}

function j(t, e) {
    var a = document.head || document.getElementsByTagName("head")[0],
        i = document.createElement("script"),
        n = !0;
    i.async = "async";
    i.type = "text/javascript";
    i.charset = "UTF-8";
    i.src = t;
    i.onload = i.onreadystatechange = function() {
        !n || i.readyState && !/loaded|complete/.test(i.readyState) || (n = false,
            e(),
            i.onload = i.onreadystatechange = null)
    };
    a.appendChild(i)
}
y && !p && j("//api.adinplay.com/player/v2/MOP/mope.io/player.min.js", z);
var V = .175,
    LAND_CL = "#3FBA54", // #3FBA54
    HILL_CL = "#09992F", // #09992F
    Z = "#09992F",
    WATER_DROP_CL = "#4E66E4",
    WATER_SOURCE_COLOR = "#4854a2", // #4854a2
    BERRY_CL = "#F35F53",
    BERRY_BUSH_CL = "#CF6259",
    CAVIAR_CL = "#FF911E",
    CAVIAR_BUSH_CL = "#C67019",
    OUTLINE_PREDATOR = "#EF3C31", // #EF3C31
    nt = HILL_CL,
    OUTLINE_EDIBle = "#4AE05E", // #4AE05E
    ROCK_CL = "#8C9688";
boardBar = !0,
    xpbar = !0,
    waterbar = false,
    mapbar = false;
this.getOutlineColor = function() {
    //if (this.name.startsWith("Maxim_MoPeR")) return "cyan";
    return this.isGreenOutlined() ? OUTLINE_EDIBle : HILL_CL
};
this.isGreenOutlined = function() {
    return this.oType == O_PLAYER ? 0 < ha[this.type - 1] : 0 < ca[this.oType - 1]
};
var MOUSE = 1,
    RABBIT = 2,
    PIG = 3,
    FOX = 4,
    DEER = 5,
    MOle = 6,
    ZEBRA = 7,
    LION = 8,
    CHEETAH = 9,
    BEAR = 10,
    CROCODIle = 11,
    RHINO = 12,
    HIPPO = 13,
    DRAGON = 14,
    REDDRAGON = 34,
    SHRIMP = 15,
    TROUT = 16,
    CRAB = 17,
    SQUID = 18,
    SHARK = 19,
    STINGRAY = 20,
    TURTle = 21,
    SEA_HORSE = 22,
    JELLYFISH = 23,
    PUFFERFISH = 24,
    DOLPHIN = 25,
    DUGONG = 26,
    HIGHBROW_BOTTleNOSE = 27,
    KILleR_WHAle = 28,
    GIANT_SQUID = 29,
    BLACK_DRAGON = 30,
    YETI = 31,
    KING_DRAGON = 32,
    GOLDEN_SHAHBAZ = 33,
    BIOME_LAND = 1,
    O_PLAYER = 2,
    HILL = 3,
    WATER_SOURCE = 4,
    BERRY_BUSHES = 5,
    BERRY = 6,
    WATER_DROP = 7,
    MUSHROOM = 8,
    SMALL_HOle = 9,
    GREEN_BUSH = 10,
    MUD = 11,
    ROCKS = 12,
    BIG_HOle = 13,
    LAKE = 14,
    LILYPAD = 15,
    ISLAND = 16,
    RED_MUSHROOM = 17,
    FIREBALL = 18,
    OCEAN_BIOME = 19,
    o_caviar = 20,
    CAVIAR_BUSH = 21,
    WHIRLPOOL = 22,
    LIGHTniNG = 23,
    SQIUD_INK = 24,
    PEAR = 25,
    VOLCANO = 26,
    HOWL = 27,
    YETI_ABILITY = 28,
    STONEHEAL = 29,
    EXTRA_BOOST = 30,
    LOUD_NOISE = 31,
    LAVA_BIOME = 32,
    O_LAVA = 33,
    FRUINT_TREE = 34,
    BANANA = 35,
    COCONUT = 36,
    FIRE_OBJ = 37,
    OCEAN_BIOME_EXTRA_WATER = 38,
    BEACH = 39,
    CARROT = 40,
    obj_Seaweed = 41,
    obj_Kelp = 42,
    obj_rasp = 43,
    obj_flagUSSR = 44,
    o_starfish = 45,
    o_clam = 46,
    o_conch = 47,
    o_melon = 48
biome_volcano = 49;    
obj_icemonstertest = 50;
te = document.getElementById("gCanvas"),
    ee = null,
    ae = null,
    loadedAudio = {},
    ctx = te.getContext("2d");
ctx.shadowColor = "black";
var Xee = null,
    Yee = "",
    Va = "audio/music_menu.mp3",
    Ja = "audio/music_game.mp3";

function gameAudio(e) {
    if (!loadedAudio.hasOwnProperty(e) && !sound) {
        var t = new Audio(e);
        console.log("loading audio: " + e);
        loadedAudio[e] = t;
        e == Va && t.addEventListener("ended", function() {
            this.currentTime = 0;
            try {
                this.play()
            } catch (e) {}
        }, !1);
        t.volume = .7;
        t.muted = sound
    }
    return loadedAudio[e]
}

function aud(e) {
    Xee && (Xee.pause(), Xee.currentTime = 0);
    Yee = e;
    if (!sound) {
        console.log("changed music to " + e);
        Xee = gameAudio(e, !0);
        try {
            Xee.play()
        } catch (e) {}
    }
}

function SoundInGame() {
    var image_sound = document.getElementById("sound_img");
    if (image_sound) {
        image_sound.src = sound ? "img/sound_off.png" : "img/sound_on.png";
        for (var i in loadedAudio) {
            loadedAudio(i) && (loadedAudio[i].muted = sound);
            !sound && Yee && null == Xee && aud(Yee)
        }
    }
}

var ne = false,
    se = Math.min(window.devicePixelRatio, 2),
    target_camzoom = n_camzoom = 2.7,
    target_camzoom = 1,
    camx = camy = n_camx = n_camy = o_camx = o_camy = 0,
    oe = 1,
    he = 0,
    de = 0,
    camzoom = 26,
    gameMouseX = 0,
    gameMouseY = 0,
    lastMouseX = 0,
    lastMouseY = 0,
    pe = false,
    ye = false,
    pressS = false,
    canvasW,
    canvasH,
    gameW = 0,
    gameH = 0;
skins = {};
loadedImgs = {};
var noImages = false,
    Me = false,
    lowGraphics = false,
    Ae = false,
    xe = false;
sound = false;
if (window.localStorage) {
    noImages = 0 < window.localStorage.getItem("options_noImages") + 0;
    document.getElementById("options_noImages").checked = noImages;
    Me = 0 < window.localStorage.getItem("options_noNames") + 0;
    document.getElementById("options_noNames").checked = Me;
    lowGraphics = 0 < window.localStorage.getItem("options_lowGraphics") + 0;
    document.getElementById("options_lowGraphics").checked = lowGraphics;
    Ae = 0 < window.localStorage.getItem("options_noJoystick") + 0;
    document.getElementById("options_noJoystick").checked = Ae;
    sound = 0 < window.localStorage.getItem("options_musicMuted") + 0;
    document.getElementById("on_offAudio").checked = sound;
    var xe = 0 < window.localStorage.getItem("options_leftHanded") + 0,
        Te = document.getElementById("options_leftHanded");
    Te && (Te.checked = xe)
    SoundInGame();
}
var ke = 0,
    Se = 0,
    Ee = +new Date,
    Ue = "... fps",
    Ce = +new Date,
    De = 0,
    Be, _e = "...",
    Oe = 0,
    MyPlayerId = 0,
    aliveInGame = false,
    target_camzoom = false,
    We = false,
    He = false,
    Ge = +new Date,
    Ye = false,
    aniType = MOUSE,
    Ne = water = 100,
    Xe = xp = xpPer = 0,
    ze = 0,
    je = 0,
    Ve = "",
    Je = new Xa(1110, 1110, 100, 100, "HOLD TO RUN"),
    qe = new Xa(0, 0, 100, 100, "W"),
    Ze = new Xa(0, 0, 100, 100, "CHAT"),
    Ke = false,
    Qe = -1,
    $e = 0,
    ta = 0,
    ea = 0,
    aa = 0,
    ia = 50,
    na = 0,
    sa = 0,
    la = 0;
joystickDistF_n = joystickDistF = 0;
var ra = 100,
    oa = Array(50).fill(0),
    ha = Array(50).fill(0),
    da = Array(50).fill(0),
    ca = Array(50).fill(0),
    fa = [],
    ObjectsData = {},
    ua = [],
    pa = +Date.now(),
    ws;
ki();
Di();
if (b) {
    console.log("Party link detected! Verifying...");
    for (var I = Ea(I), ma = false, wa = 0; wa < s.length; wa++)
        if (s[wa].ip == I && 5 < I.length) {
            var v = wa,
                A = s[v],
                ba = document.getElementById("spawnXpLabel");
            ba.style.display = "block";
            ba.style.opacity = 1;
            ba.textContent = "Joining party server...";
            b = ma = !0;
            break
        }
    ma ? (console.log("Connecting to party server..."),
        Ka(),
        ti(),
        $a()) : (alert("This party link is no longer valid! Joining auto server..."),
        I = null,
        b = false,
        U())
} else
    U();

function Ia() {
    masterWs = new WebSocket("ws://" + i + ":7500");
    masterWs.binaryType = "arraybuffer";
    masterWs.onopen = function() {
        var t = new MsgWriter(1);
        t.writeUInt8(200);
        masterWs.send(t.dataView.buffer)
    };
    masterWs.onmessage = function(t) {
        t = new MsgReader(new DataView(t.data));
        if (100 == t.readUInt8()) {
            var e = t.readUInt32();
            _e = Ya(e) + " Players";
            for (var e = t.readUInt16(), a = 0; a < e; a++)
                for (var i = Ea(t.readUInt32()), n = t.readUInt16(), l = 0; l < s.length; l++)
                    if (s[l].ip == i) {
                        s[l].playersCount = 6e4 == n ? -1 : n;
                        break
                    }
        }
        ti()
    };
    masterWs.onerror = function(t) {
        console.log("MasterServer: error connecting!")
    };
    masterWs.onclose = function(t) {}
}
Ia();
var Pa = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
    Ma = -1 < navigator.userAgent.toLowerCase().indexOf("android");
/* if ((Pa || Ma) && !p) {
    var va = false;
    if (window.localStorage) {
        va = 0 < window.localStorage.getItem("oldVisitor");
        try {
            window.localStorage.setItem("oldVisitor", 1)
        } catch (t) {
            va = !0
        }
    }
    va || (Pa ? window.location.href = "https://itunes.apple.com/us/app/mope.io/id1086471119?ls=1&CROCODIle=8" : Ma && (window.location.href = "https://play.google.com/store/apps/details?id=tatarnykov.stan.mopeioandroid"))
} */
var Aa = "ontouchstart" in window || navigator.maxTouchPoints;
Aa && console.log("mobile touch device detected!");

function getLoadedImg(e) {
    loadedImgs.hasOwnProperty(e) || (loadedImgs[e] = new Image, loadedImgs[e].src = e);
    return 0 != loadedImgs[e].width && loadedImgs[e].complete ? loadedImgs[e] : null
}

function xa(t, e) {
    return Math.random() * (e - t) + t
}

function Ta(t, e) {
    return Math.floor(Math.random() * (e - t + 1)) + t
}

function ka(t) {
    t = Math.trunc(t) % 360 + (t - Math.trunc(t));
    return 0 < t ? t : t + 360
}

function Sa(t) {
    t = t.split(".");
    return 256 * (256 * (256 * +t[0] + +t[1]) + +t[2]) + +t[3]
}

function Ea(t) {
    for (var e = t % 256, a = 3; 0 < a; a--)
        t = Math.floor(t / 256),
        e = t % 256 + "." + e;
    return e
}

function Ua(t, e) {
    var a = e.split("?")[0],
        i, n;
    i = -1 !== e.indexOf("?") ? e.split("?")[1] : "";
    if ("" !== i) {
        n = i.split("&");
        for (var s = n.length - 1; 0 <= s; --s)
            i = n[s].split("=")[0],
            i === t && n.splice(s, 1);
        a = a + "?" + n.join("&")
    }
    return a
}

function Ca(t) {
    return 180 / Math.PI * t
}

function Da(t) {
    return Math.PI / 180 * t
}

function Ba(t, e, a, i) {
    return Math.atan2(i - e, a - t)
}

function _a(t, e) {
    return 0 != (t >> e) % 2
}

function Oa(t, e, a) {
    return a ? t | 1 << e : t & ~(1 << e)
}

function Ra(t, e) {
    var a = ka(Ca(e - t));
    180 < a && (a -= 360);
    return Da(a)
}

function Fa(t, e, a) {
    return Math.min(a, Math.max(e, t))
}

function La(t) {
    return unescape(encodeURIComponent(t))
}

function Wa(t) {
    return decodeURIComponent(escape(t))
}

function Ha(t, e, a) {
    var i = 1.2 * ctx.measureText("M").width;
    t = t.split("\n");
    for (var n = 0; n < t.length; ++n)
        ctx.fillText(t[n], e, a),
        a += i
}

function Ga(t) {
    var e = parseInt(t, 10),
        a = Math.floor(e / 3600);
    t = Math.floor((e - 3600 * a) / 60);
    e = e - 3600 * a - 60 * t;
    10 > e && (e = "0" + e);
    return t + ":" + e
}

function Ya(t) {
    return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function Na(t) {
    return 1e3 > t ? t : 1e6 > t ? Math.trunc(t / 1e3 * 10) / 10 + "k" : Math.trunc(t / 1e6 * 100) / 100 + "m"
}

function Xa(t, e, a, i, n) {
    this.x = t;
    this.y = e;
    this.w = a;
    this.h = i;
    this.text = n;
    this.pressed = false;
    this.pressedTouchID = -1;
    this.abil_Type = 0;
    this.testPosHitsButton = function(t, e) {
        return t < this.x - this.w / 2 || t > this.x + this.w / 2 ? false : e < this.y - this.w / 2 || e > this.y + this.w / 2 ? false : !0
    };
    this.draw = function() {
        ctx.save();
        var e,
            t = this.pressed ? "white" : "#000000";
        ctx.globalAlpha = .2;
        ctx.fillStyle = t;
        ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        //e = gameImg(this.abil_Type);
        /*
			if (t = image(e.abilImg)) {
                var a = .4 * this.w,
                ctx.drawImage(n, -e, .85 * -e, 2 * e, 2 * e);
			}
			*/
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#000000";
        this.text && (ctx.globalAlpha = .2,
            ctx.lineWidth = 1,
            ctx.textAlign = "center",
            ctx.textBaseline = "middle",
            lowGraphics ? (ctx.shadowOffsetX = 0,
                ctx.shadowOffsetY = 0) : (ctx.shadowOffsetX = 1,
                ctx.shadowOffsetY = 1),
            ctx.fillStyle = "white",
            ctx.font = 15 * se + "px Arial",
            ctx.fillText(this.text, this.x, this.y));
        ctx.restore()
    }
}
za.prototype = {
    id: 0,
    oType: BERRY,
    spawnTime: 0,
    rPer: 0,
    updateTime: 0,
    _text: "",
    x: 0,
    y: 0,
    ox: 0,
    oy: 0,
    nx: 0,
    ny: 0,
    rad: 0,
    oRad: 0,
    nRad: 0,
    z: 0,
    name: "",
    dead: false,
    type: 0,
    curBiome: 0,
    setText: function(e) {
        e != this._text && (this._text = e, this._dirty = !0)
    },
};

function za(t, e, a, i, n) {
    this.id = t;
    this.oType = e;
    this.ox = this.x = this.nx = a;
    this.oy = this.y = this.ny = i;
    this.nRad = n;
    this.oRad = this.rad = 0;
    if (e == MUD || e == LAKE || e == LIGHTniNG || e == SQIUD_INK || e == HILL)
        this.oRad = this.rad = n;
    this.angle = this.oAngle = this.angledelta = 0;
    this.rPer = xa(0, 1);
    this.updateTime = this.spawnTime = timeStamp;
    this.flag_hurt = false;
    this.hpPer = this.hpPer_n = this.hpBarA = this.hpBarA_n = 0;
    this.oType == O_PLAYER && (this.flag_inWater = this.flag_invincible = this.flag_usingAbility = this.flag_stunned = this.flag_underWater = this.flag_tailBitten = this.flag_lowWat = false,
        this.nameA = this.stunA = this.underwaterA = 0);
    if (this.oType == O_PLAYER || this.oType == SMALL_HOle || this.oType == WHIRLPOOL || this.oType == BIG_HOle)
        this.chatLines = [];
    this.updateZ = function() {
        switch (this.oType) {
            case BIOME_LAND:
                this.z = -220;
                break;
            case LAVA_BIOME:
                this.z = -209;
                break;
            case BEACH:
                this.z = -202;
                break;
            case OCEAN_BIOME_EXTRA_WATER:
                this.z = -201;
                break;
            case OCEAN_BIOME:
                this.z = -160;
                break;
            case LAKE:
            case VOLCANO:
            case O_LAVA:
                this.z = -159;
                break;
            case biome_volcano:
                this.z = -160;
                break;
            case ROCKS:
                this.z = -155;
                break;
            case LIGHTniNG:
                this.z = -153;
                break;
            case obj_flagUSSR:
                this.z = -152;
                break;
            case SQIUD_INK:
                this.z = -151;
                break;
            case WHIRLPOOL:
                this.z = -150;
                break;
            case MUD:
                this.z = -149;
                break;
            case CARROT:
                this.z = -148;
                break;
            case obj_icemonstertest:
                this.z = -147;             
                break;
            case FIRE_OBJ:
            case FIREBALL:
            case YETI_ABILITY:
                this.z = -101;
            case ISLAND:
                this.z = -102;
                break;
            case BIG_HOle:
                this.z = -101;
                break;
            case SMALL_HOle:
                this.z = -100;
                break;
            case HILL:
                this.z = 999;
                break;
            case FRUINT_TREE:
                this.z = 1000;
                break;
            case BERRY_BUSHES:
            case CAVIAR_BUSH:
                this.z = 1001;
                break;
            case WATER_SOURCE:
                this.z = -150
                break;
            case WATER_DROP:
                this.z = -149;
                break;
            case BANANA:
            case COCONUT:
                //case FIRE_OBJ:
                this.z = 1006;
            case GREEN_BUSH:
                this.z = 10000;
                break;
            default:
                this.z = this.flag_underWater || this.flag_usingAbility && this.type == MOle ? -140 : this.type == BLACK_DRAGON ? 1008 : this.type == DRAGON ? 1004 : this.type == BEAR || this.type == RHINO ? 1e3 : 1000
        }
    };
    this.draw = function(e) {
        var t = this.moveUpdate();
        ctx.save();
        ctx.translate(this.x, this.y);
        if (!lowGraphics) var p = false;
        switch (this.oType) {
            case BERRY:
            case BANANA:
            case CARROT:
            case COCONUT:
            case o_caviar:
            case WATER_DROP:
            case MUSHROOM:
            case RED_MUSHROOM:
            case LILYPAD:
            case o_starfish:
            case o_clam:
            case o_conch:
            case SMALL_HOle:
            case WHIRLPOOL:
            case FIRE_OBJ:
            case BIG_HOle:
                p = !0;
        }
        if (p) {
            var a;
            a = (timeStamp - this.spawnTime) / 1e3;
            var i = this.oType == MUSHROOM || this.oType == RED_MUSHROOM || this.oType == LILYPAD ? 2 : 1.3,
                n = .1;
            if (this.oType == SMALL_HOle || this.oType == BIG_HOle || this.oType == WHIRLPOOL)
                i = 2.5,
                n = .04;
            a = n * Math.sin(2 * Math.PI / i * a);
            ctx.scale(1 + a, 1 + a / 2)
        }
        i = this.getOutlineColor();
        n = 2;
        this.dead ? ctx.globalAlpha * (1 - t) : ctx.globalAlpha * Math.min(1, (timeStamp - this.spawnTime) / 1e3);
        switch (this.oType) {
            case BIOME_LAND:
                ctx.fillStyle = LAND_CL;
                ctx.fillRect(-this.rectW / 2, -this.rectH / 2, this.rectW, this.rectH);

                // Draw dark grid
                var minusForEdge = 45;
                fillGrid(-this.rectW / 2 + minusForEdge, -this.rectH / 2 + minusForEdge,
                    this.rectW / 2 - minusForEdge,
                    this.rectH / 2 - minusForEdge,
                    this.x,
                    this.y
                );
                break;
            case OCEAN_BIOME:
                /*a = (timeStamp - this.spawnTime) / 1e3;
                a = -8.5 * Math.sin(2 * Math.PI / 5 * a);
                1 == (this.x > gameW / 2 ? 1 : 0) ? (ctx.fillStyle = "#4655A655",
                ctx.fillRect(-this.oceanW / 2 + a, -this.oceanH / 2 + a + 10, this.oceanW - a, this.oceanH - a - 10),
                ctx.beginPath(),
                ctx.arc(-this.oceanW / 2 + 50, -this.oceanH / 2 + 50, 70 - a, 0, 2 * Math.PI),
                ctx.fill(),
                a = 35) : (ctx.fillStyle = "#4655A655", a *= -1,
                ctx.fillRect(-this.oceanW / 2, -this.oceanH / 2 - a + 10, this.oceanW + a, this.oceanH + a - 10),
                ctx.beginPath(),
                ctx.arc(this.oceanW / 2 - 50, this.oceanH / 2 - 50, 70 - a, 0, 2 * Math.PI),
                ctx.fill(),
                a = 25);*/
                var waveDelta = 0;
                var tSinceSpawn = (timeStamp - oceanAnimStartT) / 1000;
                var period = 5;
                var shiftAm = 8.5;
                waveDelta = shiftAm * Math.sin(((2 * Math.PI) / period) * tSinceSpawn);
                var beachW = 10;

                var oceanNum = this.x > gameW / 2 ? 1 : 0;
                if (oceanNum == 1) {
                    ctx.fillStyle = WATER_SOURCE_COLOR;
                    ctx.fillRect(-this.oceanW / 2 + waveDelta, -this.oceanH / 2 + waveDelta + beachW,
                        this.oceanW - waveDelta,
                        this.oceanH - waveDelta - beachW
                    );
                    ctx.beginPath();
                    ctx.arc(-this.oceanW / 2 + 50, -this.oceanH / 2 + 50,
                        70 - waveDelta,
                        0,
                        2 * Math.PI
                    );
                    ctx.fill();
                    var minusForEdge = 35;
                    fillGrid(-this.oceanW / 2 + minusForEdge, -this.oceanH / 2 + minusForEdge,
                        this.oceanW / 2 - minusForEdge,
                        this.oceanH / 2 - minusForEdge,
                        this.x,
                        this.y
                    );

                } else {
                    ctx.fillStyle = WATER_SOURCE_COLOR;
                    //waveDelta *= -1;
                    ctx.fillRect(
                        this.oceanW / 2 - waveDelta,
                        this.oceanH / 2 - waveDelta - beachW, -this.oceanW + waveDelta, -this.oceanH + waveDelta + beachW
                    );
                    var minusForEdge = 25;
                    fillGrid(-this.oceanW / 2 + minusForEdge, -this.oceanH / 2 + minusForEdge,
                        this.oceanW / 2 - minusForEdge,
                        this.oceanH / 2 - minusForEdge,
                        this.x,
                        this.y
                    )
                }
                //grid(-this.oceanW / 2 + minusForEdge, -this.oceanH / 2 + minusForEdge, this.oceanW / 2 - minusForEdge, this.oceanH / 2 - minusForEdge, this.x, this.y);
                /*ctx.fillStyle = "#1b98be",
                ctx.fillRect(-this.oceanW / 2 + a, -this.oceanH / 2, this.oceanW - a, this.oceanH)) : (ctx.fillStyle = "#c8b745",
                ctx.fillRect(this.oceanW / 2 - 10 - 10, -this.oceanH / 2, 20, this.oceanH),
                ctx.fillStyle = "#1b98be",
                ctx.fillRect(-this.oceanW / 2, -this.oceanH / 2, this.oceanW - 10 + a, this.oceanH))*/
                /*
                	a = (timeStamp - this.spawnTime) / 1e3;
                	a = 8.5 * Math.sin(2 * Math.PI / 5 * a);
                	1 == this.oceanNum ? (ctx.fillStyle = "#c8b745",
                	ctx.fillRect(-this.oceanW / 2 - 10, -this.oceanH / 2, 30, this.oceanH),
                	ctx.fillStyle = "#1b98be",
                	ctx.fillRect(-this.oceanW / 2 + a, -this.oceanH / 2, this.oceanW - a, this.oceanH)) : (ctx.fillStyle = "#c8b745",
                	ctx.fillRect(this.oceanW / 2 - 10 - 10, -this.oceanH / 2, 20, this.oceanH),
                	ctx.fillStyle = "#1b98be",
                	ctx.fillRect(-this.oceanW / 2, -this.oceanH / 2, this.oceanW - 10 + a, this.oceanH))
                	*/
                break;
            case HILL:
                //e ? drawCircle(0, 0, this.rad, "red") : drawCircle(0, 0, this.rad - 1.5, "#c8b745");
                this.drawOutlinedCircle("", HILL_CL);
                break;
            case ROCKS:
                this.drawOutlinedCircle("", ROCK_CL);
                break;
            case BERRY_BUSHES:
                ctx.save();
                a = (timeStamp - this.spawnTime) / 1e3;
                a = 1.5 * Math.sin(2 * Math.PI / 2 * a);
                ctx.fillStyle = "#45D157";
                t = .8 * this.rad;
                this.drawOutlinedCircle("", BERRY_BUSH_CL);
                ctx.globalAlpha *= .98;
                e = .5 * -t + 10 * this.rPer;
                s = Math.max(0, .65 * t + a) + 2;
                drawCircle(.5 * -t, e, s, BERRY_BUSH_CL);
                e = .5 * -t - 10 * this.rPer;
                s = Math.max(0, .73 * t - a);
                drawCircle(.5 * t, e, s, BERRY_BUSH_CL);
                s = Math.max(0, .78 * t + a);
                drawCircle(.6 * t, .4 * t, s, BERRY_BUSH_CL);
                e = .5 * t + 10 * this.rPer;
                s = Math.max(0, .6 * t + this.rPer - a);
                drawCircle(.5 * -t, e, s, BERRY_BUSH_CL);
                ctx.restore();
                break;
            case CAVIAR_BUSH:
                ctx.save();
                a = (timeStamp - this.spawnTime) / 1e3;
                a = 1.5 * Math.sin(2 * Math.PI / 2 * a);
                ctx.fillStyle = "#45D157";
                t = .8 * this.rad;
                this.drawOutlinedCircle("", CAVIAR_BUSH_CL);
                ctx.globalAlpha *= .98;
                e = .5 * -t + 10 * this.rPer;
                s = Math.max(0, .65 * t + a) + 2;
                drawCircle(.5 * -t, e, s, ae);
                e = .5 * -t - 10 * this.rPer;
                s = Math.max(0, .73 * t - a);
                drawCircle(.5 * t, e, s, ae);
                s = Math.max(0, .78 * t + a);
                drawCircle(.6 * t, .4 * t, s, ae);
                e = .5 * t + 10 * this.rPer;
                s = Math.max(0, .6 * t + this.rPer - a);
                drawCircle(.5 * -t, e, s, "CAVIAR_BUSH_CL");
                ctx.restore();
                break;
            case WATER_SOURCE:
                this.drawOutlinedCircle("", WATER_SOURCE_COLOR);
                if (!lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);
                ctx.beginPath();
                ctx.arc(this.rad * 0.3, -this.rad * 0.35 + 15 * this.rPer, Math.max(0, this.rad * 0.35), 0, 2 * Math.PI);
                break;
            case WATER_DROP:
                this.drawOutlinedCircle("", WATER_DROP_CL);
                break;
            case BERRY:
                // Arctic #ac443c
                this.drawOutlinedCircle("Berry Bush", BERRY_CL);
                break;
            case o_caviar:
                this.drawOutlinedCircle("", CAVIAR_CL),
                    ctx.rotate(this.rPer * Math.PI * 2),
                    drawCircle(.25 * this.rad, .4 * this.rad, (.3 + .15 * this.rPer) * this.rad, "#905113");
                break;
            case MUSHROOM:
                n = 2,
                    e = this.oType == MUSHROOM ? 8 : 17;
                ctx.fillStyle = this.getOutlineColor();
                ctx.beginPath();
                ctx.rect(-e / 2 - n, -n, e + 2 * n, .8 * this.rad + 2 * n);
                ctx.fill();
                ctx.fillStyle = "#FFCA49";
                ctx.beginPath();
                ctx.rect(-e / 2, 0 + n / 2, e, .8 * this.rad - n / 2);
                ctx.fill();
                lowGraphics || (ctx.beginPath(), ctx.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI), ctx.fillStyle = this.getOutlineColor(), ctx.fill());
                ctx.beginPath();
                ctx.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI);
                ctx.fillStyle = this.oType == MUSHROOM ? "#CFAD59" : "#B8413B";
                ctx.fill();
               /* n = 2,
                a = 9,
                this.isGreenOutlined() && (n = 3,
                ctx.fillStyle = this.getOutlineColor(),
                ctx.beginPath(),
                ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
                ctx.fill(),
                ctx.beginPath(),
                ctx.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI),
                ctx.fillStyle = this.getOutlineColor(),
                ctx.fill(),
                n = 1),
                ctx.fillStyle = this.getOutlineColor(),
                ctx.beginPath(),
                ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
                ctx.fill(),
                ctx.fillStyle = "#FFCA49",
                ctx.beginPath(),
                ctx.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
                ctx.fill(),
                lowGraphics || (ctx.beginPath(),
                ctx.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI),
                ctx.fillStyle = HILL_CL,
                ctx.fill()),
                ctx.beginPath(),
                ctx.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
                ctx.fillStyle = "#CFAD59",
                ctx.fill();*/
                break;
            case RED_MUSHROOM:
                n = 2,
                    a = 15,
                    this.isGreenOutlined() && (n = 3,
                        ctx.fillStyle = i,
                        ctx.beginPath(),
                        ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI),
                        ctx.fillStyle = i,
                        ctx.fill(),
                        n = 1),
                    ctx.fillStyle = HILL_CL,
                    ctx.beginPath(),
                    ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
                    ctx.fill(),
                    ctx.fillStyle = "#FFCA49",
                    ctx.beginPath(),
                    ctx.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
                    ctx.fill(),
                    lowGraphics || (ctx.beginPath(),
                        ctx.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI),
                        ctx.fillStyle = HILL_CL,
                        ctx.fill()),
                    ctx.beginPath(),
                    ctx.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
                    ctx.fillStyle = "#B8413B",
                    ctx.fill();
                break;
            case LILYPAD:
                ctx.fillStyle = i,
                    a = 6.28 * this.rPer,
                    ctx.beginPath(),
                    ctx.arc(0, 0, this.rad + 2, 0 + a, a + 2 * Math.PI - 1.57),
                    ctx.fill(),
                    ctx.fillStyle = "#3DAA4C",
                    ctx.beginPath(),
                    ctx.arc(0, 0, this.rad, 0 + a, a + 2 * Math.PI - 1.57),
                    ctx.fill();
                break;
            case GREEN_BUSH:
                n = 2;
                ctx.save();
                a = (timeStamp - this.spawnTime) / 1e3;
                a = 1.5 * Math.sin(2 * Math.PI / 2 * a);
                ctx.fillStyle = "#45D15755";
                ctx.globalAlpha = .93;
                ctx.beginPath();
                ctx.arc(.5 * -this.rad, .5 * -this.rad + 10 * this.rPer, Math.max(0, .65 * this.rad + a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(.5 * this.rad, .5 * -this.rad - 10 * this.rPer, Math.max(0, .73 * this.rad - a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .78 * this.rad + a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .6 * this.rad + this.rPer - a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
                break;
            case MUD:
                ctx.save(),
                    lowGraphics || ctx.rotate(2 * this.rPer * Math.PI),
                    a = (timeStamp - this.spawnTime) / 1e3,
                    a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
                    ctx.globalAlpha = 1,
                    n = 4,
                    ctx.fillStyle = "#8B7833",
                    ctx.beginPath(),
                    ctx.arc(0, 0, this.rad, 0, 2 * Math.PI),
                    ctx.fill(),
                    lowGraphics || (ctx.fillStyle = "#98803A",
                        ctx.globalAlpha = 1,
                        ctx.beginPath(),
                        ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.beginPath(),
                        ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.beginPath(),
                        ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath()),
                    ctx.restore();
                break;
            case LAKE:
                ctx.save(),
                    lowGraphics || ctx.rotate(2 * this.rPer * Math.PI),
                    a = (timeStamp - this.spawnTime) / 1e3,
                    a = 5.5 * Math.sin(2 * Math.PI / 4 * a),
                    ctx.globalAlpha = 1,
                    n = 4,
                    ctx.fillStyle = "#c8b745",
                    ctx.beginPath(),
                    ctx.arc(0, 0, this.rad, 0, 2 * Math.PI),
                    ctx.fill(),
                    ctx.fillStyle = WATER_SOURCE_COLOR,
                    ctx.beginPath(),
                    ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
                    ctx.fill(),
                    lowGraphics || (ctx.beginPath(),
                        ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
                        ctx.fill()),
                    ctx.restore();
                break;
            case WHIRLPOOL:
                a = (timeStamp - this.spawnTime) / 1e3;
                i = 1.2;
                t = 2.5 * Math.cos(2 * Math.PI / i * a);
                a = 2.5 * Math.sin(2 * Math.PI / i * a);
                this.drawOutlinedCircle("", "#2CAAC4");
                lowGraphics || drawCircle(0 + t / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, this.rad - 6), "#2D93B0");
                drawCircle(0 + t / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, this.rad - 14), "#29A0BA");
                drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 18.5 + a / 5), "#2B8CAA");
                drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 24.5 + a / 11), "#28829E");
                break;
            case SMALL_HOle:
                this.drawOutlinedCircle("", "#9F8641");
                drawCircle(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35");
                drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28");
                break;
            case BIG_HOle:
                this.drawOutlinedCircle("", "#9F8641");
                lowGraphics || drawCircle(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35");
                drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 14), "#5C4E28");
                drawCircle(0 - 2 * this.rPer - 3, 1, Math.max(0, this.rad - 18.5), "#40371D");
                break;
            case ISLAND:
                ctx.fillStyle = "#C8B745",
                    ctx.beginPath(),
                    ctx.arc(0, 0, Math.max(0, this.rad), 0, Math.PI * 2),
                    ctx.fill(),
                    ctx.fillStyle = "#E4D04C",
                    ctx.beginPath(),
                    ctx.arc(-5 + this.rPer * 10, -5 + this.rPer * 10, this.rad * 0.8, 0, Math.PI * 2),
                    ctx.fill();
                break;
            case VOLCANO:
                drawCircle(0, 0, Math.max(0, 1 * this.rad), "#815427");
                drawCircle(0, 0, Math.max(0, .6 * this.rad), "#6e4b29");
                drawCircle(0, 0, Math.max(0, .5 * this.rad), "#543d28");
                drawCircle(0, 0, Math.max(0, .45 * this.rad), "#3f3124");
                drawCircle(0, 0, Math.max(0, .33 * this.rad), "#241e19");
                drawCircle(0, 0, Math.max(0, .25 * this.rad), "#120f0d");
                drawCircle(0, 0, Math.max(0, .2 * this.rad), "#ff6000");
                break;
            case LIGHTniNG:
                ctx.save();
                drawCircle(0, 0, this.rad, "#61c5ff");
                ctx.restore();
                break;
            case SQIUD_INK:
                ctx.save(),
                    t = ctx.globalAlpha,
                    lowGraphics || ctx.rotate(2 * this.rPer * Math.PI),
                    a = (timeStamp - this.spawnTime) / 1e3,
                    a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
                    ctx.globalAlpha = .7 * t,
                    n = 4,
                    ctx.fillStyle = "black",
                    ctx.beginPath(),
                    ctx.arc(0, 0, this.rad, 0, 2 * Math.PI),
                    ctx.fill(),
                    lowGraphics || (ctx.fillStyle = "black",
                        ctx.globalAlpha = .5 * t,
                        ctx.beginPath(),
                        ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.beginPath(),
                        ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath(),
                        ctx.beginPath(),
                        ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
                        ctx.fill(),
                        ctx.beginPath()),
                    ctx.restore();
                break;
            case HOWL:
                ctx.save();
                t = ctx.globalAlpha;
                ctx.globalAlpha = .15 * t;
                drawCircle(0, 0, this.rad, "#6D7471");
                ctx.restore();
                break;
            case YETI_ABILITY:
                ctx.save();
                t = ctx.globalAlpha;
                ctx.globalAlpha = .4 * t;
                drawCircle(0, 0, this.rad, "#7EBCC0");
                ctx.globalAlpha = 1 * t;
                ctx.strokeStyle = "white";
                ctx.beginPath();
                e = 10;
                ctx.translate(-5, -.7 * this.rad);
                ctx.moveTo(0, -e);
                ctx.lineTo(0, e);
                ctx.moveTo(-e, -e);
                ctx.lineTo(e, e);
                ctx.moveTo(e, -e);
                ctx.lineTo(-e, e);
                ctx.moveTo(-e, 0);
                ctx.lineTo(e, 0);
                ctx.lineWidth = 3;
                ctx.stroke();
                ctx.restore();
                break;
            case STONEHEAL:
                if (n = getLoadedImg("img/healingStone" + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                //ctx.drawImage(n, -e * i, -e * i, 2 * e * i, 2 * e * i)
                break;
            case EXTRA_BOOST:
                ctx.save();
                var oldA = ctx.globalAlpha;
                ctx.globalAlpha = .15 * oldA;
                drawCircle(0, 0, this.rad, "#755A2A");
                ctx.restore();
                break;
            case LOUD_NOISE:
                ctx.save();
                t = ctx.globalAlpha;
                ctx.globalAlpha = .2 * t;
                drawCircle(0, 0, this.rad, "#746B3E");
                ctx.restore();
                break;
            case LAVA_BIOME:
                ctx.save();
                lowGraphics || ctx.rotate(2 * this.rPer * Math.PI);
                a = (timeStamp - this.spawnTime) / 1e3;
                //i = 1.5 * Math.sin(2 * Math.PI / 6 * i);
                a = 1.5 * Math.sin(2 * Math.PI / 6 * a);
                n = 4;
                ctx.fillStyle = "#604729";
                ctx.beginPath();
                ctx.arc(0, 0, this.rad, 0, 2 * Math.PI);
                ctx.fill();
                lowGraphics || (ctx.fillStyle = "#8A681B", ctx.beginPath(), ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.beginPath(), ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.beginPath(), ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), ctx.fill(), ctx.beginPath());
                ctx.restore();
                break;
            case O_LAVA:
                ctx.save();
                a = (timeStamp - this.spawnTime) / 1e3;
                a = 2.5 * Math.sin(2 * Math.PI / 6 * a);
                if (e) n = 4, ctx.fillStyle = "#815427", ctx.beginPath(), ctx.arc(0, 0, this.rad, 0, 2 * Math.PI), ctx.fill();
                else {
                    ctx.fillStyle = "#ff6000";
                    ctx.beginPath();
                    ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI);
                    ctx.fill();
                    lowGraphics || (ctx.beginPath(), ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), ctx.fill());
                    ctx.save();
                    ctx.globalAlpha = 1 - this.underwaterA;
                    a = (timeStamp - this.spawnTime) / 1e3;
                    e = 8 * Math.sin(2 * Math.PI / 1.5 * a);
                    this.flag_underWater && (ctx.globalAlpha *= .5, this.type == CROCODIle && (ctx.globalAlpha = .3));
                    ctx.fillStyle = "yellow";
                    a = .15 * this.rad;
                    ctx.beginPath();
                    for (c = 1; 1 >= c; c++) ctx.save(), ctx.globalAlpha = .2, ctx.rotate(this.rPer * Math.PI * 2 * c), ctx.beginPath(), ctx.arc(-.35 * this.rad, -.33 * this.rad, Math.max(0, a + e), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.35 * this.rad, -.32 * this.rad, Math.max(0, a - e), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(.35 * this.rad, .36 * this.rad, Math.max(0, a + e), 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(-.35 * this.rad, .35 * this.rad, Math.max(0, a - e), 0, 2 * Math.PI), ctx.fill(), ctx.restore();
                    ctx.restore()
                }
                ctx.restore();
                break;
            case FRUINT_TREE:
                this.drawOutlinedCircle("", "#1AAE31");
                ctx.save();
                a = (timeStamp - this.spawnTime) / 1e3;
                a = 1.5 * Math.sin(2 * Math.PI / 2 * a);
                ctx.fillStyle = LAND_CL;
                t = .75 * this.rad;
                ctx.globalAlpha *= .8;
                ctx.beginPath();
                ctx.arc(.5 * -t, .5 * -t + 10 * this.rPer, Math.max(0, .65 * t + a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(.5 * t, .5 * -t - 10 * this.rPer, Math.max(0, .73 * t - a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(.6 * t, .4 * t, Math.max(0, .78 * t + a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(.5 * -t, .5 * t, Math.max(0, .6 * t + this.rPer - a), 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
                break;
            case PEAR:
                if (n = getLoadedImg("img/pear" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case BANANA:
                if (n = getLoadedImg("img/banana" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case COCONUT:
                if (n = getLoadedImg("img/coconut" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case FIREBALL:
                var period = 1.0; //periodic func with time
                let timestamp = +new Date()
                var p_min = 0.15,
                    p_max = 0.8; //set these!
                var amp = 0.5 * (p_max - p_min);
                var flashA =
                    p_min +
                    amp +
                    amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0));

                {
                    ctx.globalAlpha *= flashA;
                    // drawCircle(0, 0, Math.max(0, this.rad), "#F6EA65");
                }

                //glow stronger/weaker like a fire
                var period = 1.0; //periodic func with time
                var p_min = 0.85,
                    p_max = 1.0; //set these!
                var amp = 0.5 * (p_max - p_min);
                var moveA =
                    p_min +
                    amp +
                    amp * Math.sin(((2.0 * Math.PI) / period) * (timestamp / 1000.0)) + 0.3;

                var imNum = Math.trunc(timestamp / 120) % 2;
                //console.log("fire: " + imNum);
                //var theImg = getLoadedImg(imNum == 1 ? "img/fire.png" : "img/fire2.png");

                var theImg = getLoadedImg("img/afire" + imNum + ".png");


                if (theImg) {
                    var imX = 0,
                        imY = this.rad * 0.4;
                    var imW = (this.rad * 2.0 * (2.0 + moveA * 2.0)) / 3.0,
                        imH = this.rad * 3.5 * moveA;
                    var imAnchorX = 0.5,
                        imAnchorY = 0.95; //top-left= 0,0, bottom-right=1,1 (canvas coords)

                    {
                        ctx.globalAlpha = 1
                        ctx.rotate(this.angle);
                        ctx.drawImage(
                            theImg,
                            imX + imW * -imAnchorX,
                            imY + imH * -imAnchorY,
                            imW,
                            imH
                        );

                        if (this.animal == 32) {
                            ctx.globalCompositeOperation = "source-in";
                            ctx.fillStyle = "#09f";
                            ctx.fillRect(0, 0, c.width, c.height);
                        }
                    }

                }
                break;

            case FIRE_OBJ:
                ctx.save();
                t = ctx.globalAlpha;
                ctx.globalAlpha = .5 * t;
                s = Math.max(0, this.rad - 30);
                a = (timeStamp - this.spawnTime) / 1e3;
                i = 2.2;
                t = 6.5 * Math.cos(2 * Math.PI / i * a);
                a = 6.5 * Math.sin(2 * Math.PI / i * a);
                ctx.globalAlpha = .4 * t;
                drawCircle(0, 0, e, "#2CAAC4");
                ctx.globalAlpha = .7 * t;
                lowGraphics || drawCircle(0 + t / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, s - 6), "#2D93B0");
                drawCircle(0 + t / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, s - 14), "#29A0BA");
                drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, s - 38.5 + a / 5), "#2B8CAA");
                drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, s - 54.5 + a / 11), "#28829E");
                ctx.restore();


                /*
							a = (timeStamp - this.spawnTime) / 1e3;
							i = 1.2;
							t = 2.5 * Math.cos(2 * Math.PI / i * a);
							a = 2.5 * Math.sin(2 * Math.PI / i * a);
							this.drawOutlinedCircle("", "#2CAAC4");
							lowGraphics || drawCircle(0 + t / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, this.rad - 6), "#2D93B0");
							drawCircle(0 + t / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, this.rad - 14), "#29A0BA");
							drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 18.5 + a / 5), "#2B8CAA");
							drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 24.5 + a / 11), "#28829E");
							*/
                break;
            case o_melon:
                if (n = getLoadedImg("img/melon.png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;

            case biome_volcano:
                {
                    ctx.save();

                    let timestamp = +new Date()
                    if (!options_lowGraphics) ctx.rotate(this.rPer * 2 * Math.PI);

                    var rShift = 0;
                    var tSinceSpawn = (timestamp - this.spawnTime) / 1000.0;
                    var period = 6.0;
                    var shiftAm = 1.5;
                    rShift = shiftAm * Math.sin(((2.0 * Math.PI) / period) * tSinceSpawn);

                    //console.log("Mud");
                    //ctx.globalAlpha = 1;
                    //green outline (without stroke- optimized)
                    var strokeW = 4;
                    ctx.fillStyle = "#604729";
                    ctx.beginPath();
                    ctx.arc(0, 0, this.rad, 0, Math.PI * 2);
                    ctx.fill();

                    if (!options_lowGraphics) {
                        ctx.fillStyle = "#8A681B";
                        //ctx.globalAlpha = 1;
                        ctx.beginPath();
                        ctx.arc(
                            0,
                            0,
                            Math.max(0, this.rad - strokeW + rShift),
                            0,
                            Math.PI * 2
                        );
                        ctx.fill();

                        ctx.beginPath(); //top right
                        ctx.arc(
                            this.rad * 0.45, -this.rad * 0.45 + 15.0 * this.rPer,
                            Math.max(0, this.rad * 0.5 + rShift),
                            0,
                            2 * Math.PI
                        );
                        ctx.fill();

                        ctx.beginPath(); //bottom right
                        ctx.arc(
                            this.rad * 0.5,
                            this.rad * 0.5 + 15.0 * this.rPer,
                            Math.max(0, this.rad * 0.4 + rShift),
                            0,
                            2 * Math.PI
                        );
                        ctx.fill();

                        ctx.beginPath(); //bottom left
                        ctx.arc(-this.rad * 0.55 * 0.707, +this.rad * 0.55 * 0.707 + 15.0 * this.rPer,
                            Math.max(0, this.rad * 0.5 + rShift),
                            0,
                            2 * Math.PI
                        );
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(-this.rad * 0.75, -this.rad * 0.35 + 15.0 * this.rPer,
                            Math.max(0, this.rad * 0.3 + rShift),
                            0,
                            2 * Math.PI
                        );
                        ctx.fill();
                        ctx.beginPath();
                        ctx.beginPath();
                        ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.beginPath();
                        ctx.arc(
                            this.rad - 20 * this.rPer,
                            50 * this.rPer,
                            10,
                            0,
                            2 * Math.PI
                        );
                        ctx.fill();
                        ctx.beginPath();
                    }

                    ctx.restore();
                }
                break;
            case OCEAN_BIOME_EXTRA_WATER:
                ctx.save();
                lowGraphics || ctx.rotate(2 * this.rPer * Math.PI);
                a = (timeStamp - pa) / 1e3;
                a = 5.5 * Math.sin(2 * Math.PI / 5 * a);
                e || (ctx.fillStyle = "#4655A6", ctx.beginPath(), ctx.arc(0, 0, Math.max(0, this.rad - a + a), 0, 2 * Math.PI), ctx.fill(), lowGraphics || (ctx.beginPath(), ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), ctx.fill(), ctx.beginPath(), ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), ctx.fill()));
                ctx.restore();
                //_n(-this.oceanW / 2 + e, -this.oceanH / 2 + e, this.oceanW / 2 - e, this.oceanH / 2 - e, this.x, this.y);
                /*ctx.save();
                lowGraphics || ctx.rotate(2 * this.rPer * Math.PI);
                a = (timeStamp - pa) / 1e3;
                a = 5.5 * Math.sin(2 * Math.PI / 5 * a);
                ctx.fillStyle = WATER_DROP_CL, ctx.beginPath(), ctx.arc(0, 0, Math.max(0, this.rad + a), ctx.fill(), )*/
                break;
            case BEACH:
                ctx.fillStyle = "#C8B745";
                t = -this.oceanW / 2;
                s = this.oceanW / 2;
                n = -this.oceanH / 2;
                r = this.oceanH / 2;
                ctx.beginPath();
                ctx.moveTo(t, n);
                var l = 20,
                    o = [-15, 10, -10, 12, 0, 5, -10, 5, -12, 5, 10, 0, -6],
                    h = 45,
                    d = 0,
                    g = gameW - this.x,
                    f = 0 - this.x,
                    u = gameH - this.y,
                    m = 0 - this.y;
                i = t - l;
                for (e = n; e < r; e += h) ctx.lineTo(Math.min(g, Math.max(f, i + o[d])), e), d = (d + 1) % o.length;
                ctx.lineTo(t, r);
                e = r + l;
                for (i = t; i < s; i += h) ctx.lineTo(i, Math.min(u, Math.max(m, e + o[d]))), d = (d + 1) % o.length;
                ctx.lineTo(s, r);
                i = s + l;
                for (e = r; e > n; e -= h) ctx.lineTo(Math.min(g, Math.max(f, i + o[d])), e), d = (d + 1) % o.length;
                ctx.lineTo(s, n);
                e = n - l;
                for (i = s; i > t; i -= h) ctx.lineTo(i, Math.min(u, Math.max(m, e + o[d]))), d = (d + 1) % o.length;
                ctx.closePath();
                ctx.fill();
                break;
            case CARROT:
                if (n = getLoadedImg("img/carrot" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case obj_Seaweed:
                if (n = getLoadedImg("img/seaweed" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case obj_Kelp:
                if (n = getLoadedImg("img/kelp" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case obj_rasp:
                if (n = getLoadedImg("img/rasp" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case obj_flagUSSR:
                var theImg = getLoadedImg('img/USSR.png');
                if (theImg) {
                    var rad = this.rad;
                    ctx.save();
                    ctx.rotate(0);
                    ctx.drawImage(theImg, -rad, -rad, 2 * rad, 2.5 * rad);
                    ctx.restore();
                }
                break;
            case obj_icemonstertest:
                var theImg = getLoadedImg('img/icemonster.png');
                if (theImg) {
                    var rad = this.rad;
                    ctx.save();
                    ctx.rotate(0);
                    ctx.drawImage(theImg, -rad, -rad, 3 * rad, 3 * rad);
                    ctx.restore();
                }
                break;
            case o_starfish:
                if (n = getLoadedImg("img/starfish" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case o_clam:
                if (n = getLoadedImg("img/clam" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case o_conch:
                if (n = getLoadedImg("img/conch" + (this.isGreenOutlined() ? "_e" : "") + ".png")) e = this.rad,
                    ctx.rotate(this.rPer * Math.PI * 2),
                    ctx.drawImage(n, -e, -e, 2 * e, 2 * e);
                break;
            case O_PLAYER:
                this.drawAnimal(t);
                break;
            default:
                this.drawOutlinedCircle("????", "black");
                break;
        }
        this.flag_hurt && (ctx.fillStyle = "rgba(255,0,0,0.3)",
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - n), 0, 2 * Math.PI),
            ctx.fill());
        this.hpBarA += .04 * (this.hpBarA_n - this.hpBarA);
        .001 < this.hpBarA && (this.hpPer += .1 * (this.hpPer_n - this.hpPer),
            t = Math.max(1, this.rad / 25),
            n = 20 * t,
            a = 5 * t,
            t = -this.rad - 10 * t,
            ctx.globalAlpha *= this.hpBarA,
            ctx.fillStyle = "rgba(0,0,0,0.35)",
            ctx.fillRect(0 - n / 2, t - a / 2, n, a),
            ctx.fillStyle = "#16D729",
            ctx.fillRect(0 - n / 2, t - a / 2, this.hpPer / 100 * n, a));
        ctx.restore()

    };

    /*
        this.draw = function() {
            var t = this.moveUpdate();
            ctx.save();
            ctx.translate(this.x, this.y);
            if (!lowGraphics && (this.oType == BERRY || this.oType == CAVIAR || this.oType == WATER_DROP || this.oType == MUSHROOM || this.oType == RED_MUSHROOM || this.oType == LILYPAD || this.oType == SMALL_HOle || this.oType == WHIRLPOOL || this.oType == BIG_HOle)) {
                var a;
                a = (timeStamp - this.spawnTime) / 1e3;
                var i = this.oType == MUSHROOM || this.oType == RED_MUSHROOM || this.oType == LILYPAD ? 2 : 1.3
                  , n = .1;
                if (this.oType == SMALL_HOle || this.oType == BIG_HOle || this.oType == WHIRLPOOL)
                    i = 2.5,
                    n = .04;
                a = n * Math.sin(2 * Math.PI / i * a);
                ctx.scale(1 + a, 1 + a / 2)
            }
            i = this.getOutlineColor();
            n = 2;
            this.dead ? ctx.globalAlpha *= 1 - t : e != Jt && (ctx.globalAlpha *= Math.min(1, (timeStamp - this.spawnTime) / (1e3 * V)));
            this.oType == HILL ? this.drawOutlinedCircle("", q) : this.oType == BERRY_BUSHES ? this.drawOutlinedCircle("", BERRY_BUSH_CL) : this.oType == CAVIAR_BUSH ? this.drawOutlinedCircle("", at) : this.oType == WATER_SOURCE ? this.drawOutlinedCircle("", WATER_SOURCE_COLOR) : this.oType == BERRY ? this.drawOutlinedCircle("", $) : this.oType == CAVIAR ? (this.drawOutlinedCircle("", et),
            ctx.rotate(this.rPer * Math.PI * 2),
            drawCircle(.25 * this.rad, .4 * this.rad, (.3 + .15 * this.rPer) * this.rad, "#905113")) : this.oType == MUSHROOM || this.oType == RED_MUSHROOM ? (n = 2,
            a = this.oType == RED_MUSHROOM ? 15 : 9,
            this.isGreenOutlined() && (n = 3,
            ctx.fillStyle = i,
            ctx.beginPath(),
            ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI),
            ctx.fillStyle = i,
            ctx.fill(),
            n = 1),
            ctx.fillStyle = q,
            ctx.beginPath(),
            ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            ctx.fill(),
            ctx.fillStyle = "#FFCA49",
            ctx.beginPath(),
            ctx.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
            ctx.fill(),
            lowGraphics || (ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI),
            ctx.fillStyle = q,
            ctx.fill()),
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
            ctx.fillStyle = this.oType == RED_MUSHROOM ? "#B8413B" : "#CFAD59",
            ctx.fill()) : this.oType == BIG_MUSHROOM ? (n = 2,
            ctx.save(),
            a = (timeStamp - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 2 * a),
            ctx.fillStyle = "#45D157",
            ctx.globalAlpha = .93,
            ctx.beginPath(),
            ctx.arc(.5 * -this.rad, .10 * -this.rad + 10 * this.rPer, Math.max(0, .55 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * this.rad, .10 * -this.rad - 10 * this.rPer, Math.max(0, .43 * this.rad - a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .48 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .4 * this.rad + this.rPer - a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.restore(),
            a = 20,
            ctx.fillStyle = i,
            ctx.beginPath(),
            ctx.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            ctx.fill(),
            ctx.fillStyle = "#FFCA49",
            ctx.beginPath(),
            ctx.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, .8 * this.rad), Math.PI, 2 * Math.PI),
            ctx.fillStyle = i,
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, .8 * this.rad - n), Math.PI, 2 * Math.PI),
            ctx.fillStyle = "#B8413B",
            ctx.fill()) : this.oType == LILYPAD ? (ctx.fillStyle = i,
            a = 6.28 * this.rPer,
            ctx.beginPath(),
            ctx.arc(0, 0, this.rad + 2, 0 + a, a + 2 * Math.PI - 1.57),
            ctx.fill(),
            ctx.fillStyle = "#3DAA4C",
            ctx.beginPath(),
            ctx.arc(0, 0, this.rad, 0 + a, a + 2 * Math.PI - 1.57),
            ctx.fill()) : this.oType == SMALL_HOle ? (this.drawOutlinedCircle("", "#9F8641"),
            drawCircle(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35"),
            drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28")) : this.oType == LIGHTniNG ? (ctx.save(),
            t = ctx.globalAlpha,
            ctx.globalAlpha = .5 * t,
            drawCircle(0, 0, this.rad, "#62C5FF"),
            ctx.globalAlpha = 1 * t,
            ctx.strokeStyle = "#62C5FF",
            ctx.beginPath(),
            a = -.7 * this.rad,
            ctx.moveTo(a, -5),
            ctx.lineTo(a - 4, 5),
            ctx.lineTo(a + 4, 2),
            ctx.lineTo(a + 2, 15),
            ctx.lineWidth = 3,
            ctx.stroke(),
            ctx.restore()) : this.oType == LIGHTniNG ? (ctx.save(),
            drawCircle(0, 0, this.rad, "#61c5ff"),
            ctx.restore()) : this.oType == SQIUD_INK ? (ctx.save(),
            t = ctx.globalAlpha,
            lowGraphics || ctx.rotate(2 * this.rPer * Math.PI),
            a = (timeStamp - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
            ctx.globalAlpha = .7 * t,
            n = 4,
            ctx.fillStyle = "black",
            ctx.beginPath(),
            ctx.arc(0, 0, this.rad, 0, 2 * Math.PI),
            ctx.fill(),
            lowGraphics || (ctx.fillStyle = "black",
            ctx.globalAlpha = .5 * t,
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.beginPath(),
            ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.beginPath(),
            ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath()),
            ctx.restore()) : this.oType == WHIRLPOOL ? (a = (timeStamp - this.spawnTime) / 1e3,
            i = 1.2,
            t = 2.5 * Math.cos(2 * Math.PI / i * a),
            a = 2.5 * Math.sin(2 * Math.PI / i * a),
            this.drawOutlinedCircle("", "#2CAAC4"),
            lowGraphics || drawCircle(0 + t / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, this.rad - 6), "#2D93B0"),
            drawCircle(0 + t / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, this.rad - 14), "#29A0BA"),
            drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 18.5 + a / 5), "#2B8CAA"),
            drawCircle(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 24.5 + a / 11), "#28829E")) : this.oType == BIG_HOle ? (this.drawOutlinedCircle("", "#9F8641"),
            lowGraphics || drawCircle(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35"),
            drawCircle(0 + this.rPer, 1, Math.max(0, this.rad - 14), "#5C4E28"),
            drawCircle(0 - 2 * this.rPer - 3, 1, Math.max(0, this.rad - 18.5), "#40371D")) : this.oType == GREEN_BUSH ? (ctx.save(),
            a = (timeStamp - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 2 * a),
            ctx.fillStyle = "#45D157",
            ctx.globalAlpha = .93,
            ctx.beginPath(),
            ctx.arc(.5 * -this.rad, .5 * -this.rad + 10 * this.rPer, Math.max(0, .65 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * this.rad, .5 * -this.rad - 10 * this.rPer, Math.max(0, .73 * this.rad - a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .78 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .6 * this.rad + this.rPer - a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.restore()) : this.oType == MUD ? (ctx.save(),
            lowGraphics || ctx.rotate(2 * this.rPer * Math.PI),
            a = (timeStamp - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
            ctx.globalAlpha = 1,
            n = 4,
            ctx.fillStyle = "#8B7833",
            ctx.beginPath(),
            ctx.arc(0, 0, this.rad, 0, 2 * Math.PI),
            ctx.fill(),
            lowGraphics || (ctx.fillStyle = "#98803A",
            ctx.globalAlpha = 1,
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.beginPath(),
            ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.beginPath(),
            ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath()),
            ctx.restore()) : this.oType == LAKE ? (ctx.save(),
            lowGraphics || ctx.rotate(2 * this.rPer * Math.PI),
            a = (timeStamp - this.spawnTime) / 1e3,
            a = 5.5 * Math.sin(2 * Math.PI / 4 * a),
            ctx.globalAlpha = 1,
            n = 4,
            ctx.fillStyle = "#c8b745",
            ctx.beginPath(),
            ctx.arc(0, 0, this.rad, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.fillStyle = WATER_SOURCE_COLOR,
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
            ctx.fill(),
            lowGraphics || (ctx.beginPath(),
            ctx.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
            ctx.fill()),
            ctx.restore()) : this.oType == Jt ? (a = (timeStamp - this.spawnTime) / 1e3,
            a = 8.5 * Math.sin(2 * Math.PI / 5 * a),
            1 == this.oceanNum ? (ctx.fillStyle = "#c8b745",
            ctx.fillRect(-this.oceanW / 2 - 10, -this.oceanH / 2, 30, this.oceanH),
            ctx.fillStyle = "#1b98be",
            ctx.fillRect(-this.oceanW / 2 + a, -this.oceanH / 2, this.oceanW - a, this.oceanH)) : (ctx.fillStyle = "#c8b745",
            ctx.fillRect(this.oceanW / 2 - 10 - 10, -this.oceanH / 2, 20, this.oceanH),
            ctx.fillStyle = "#1b98be",
            ctx.fillRect(-this.oceanW / 2, -this.oceanH / 2, this.oceanW - 10 + a, this.oceanH))) : this.oType == ROCKS ? this.drawOutlinedCircle("", lt) : this.oType == ISLAND ? (ctx.fillStyle = "#C8B745",
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.fillStyle = "#E4D04C",
            ctx.beginPath(),
            ctx.arc(-5 + 10 * this.rPer, -5 + 10 * this.rPer, .8 * this.rad, 0, 2 * Math.PI),
            ctx.fill()) : this.oType == WATER_DROP ? this.drawOutlinedCircle("", K) : this.oType == O_PLAYER ? this.drawAnimal(t) : this.drawOutlinedCircle("????", "black");
            this.flag_hurt && (ctx.fillStyle = "rgba(255,0,0,0.3)",
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - n), 0, 2 * Math.PI),
            ctx.fill());
            this.hpBarA += .04 * (this.hpBarA_n - this.hpBarA);
            .001 < this.hpBarA && (this.hpPer += .1 * (this.hpPer_n - this.hpPer),
            t = Math.max(1, this.rad / 25),
            n = 20 * t,
            a = 5 * t,
            t = -this.rad - 10 * t,
            ctx.globalAlpha *= this.hpBarA,
            ctx.fillStyle = "rgba(0,0,0,0.35)",
            ctx.fillRect(0 - n / 2, t - a / 2, n, a),
            ctx.fillStyle = "#16D729",
            ctx.fillRect(0 - n / 2, t - a / 2, this.hpPer / 100 * n, a));
            ctx.restore()
        };
		*/
    /*this.drawChat = function() {
    	if (!(1 > this.chatLines.length)) {
    		ctx.save();
    		ctx.font = "10px Arial";
    		ctx.lineWidth = 1;
    		ctx.textAlign = "center";
    		ctx.textBaseline = "middle";
    		for (var s = .01 < this.hpBarA ? -10 : 0, t = [], e = this.chatLines.length - 1; 0 <= e; e--) {
    		var a = this.chatLines[e],
    			i = -13 * (this.chatLines.length - 1 e) + s,
    			n = timeStamp > a.chatFadeT ? 0 : 1;
    			a.chatA += .1 * (n - a.chatA);
    			ctx.shadowOffsetX = 0;
    			ctx.shadowOffsetY = 0;
    			.02 > a.chatA ? (.02 > n && (a.chatTxt = ""), t.push(e) : ())
    		}
    	}
    };*/
    this.drawChat = function() {
        if (!(1 > this.chatLines.length)) {
            ctx.save();
            ctx.font = "10px Arial";
            ctx.lineWidth = 1;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            for (var t = [], e = this.chatLines.length - 1; 0 <= e; e--) {
                var a = this.chatLines[e],
                    i = -13 * (this.chatLines.length - 1 - e),
                    n = timeStamp > a.chatFadeT ? 0 : 1;
                a.chatA += .1 * (n - a.chatA);
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                .02 > a.chatA ? (.02 > n && (a.chatTxt = ""),
                    t.push(e)) : (n = ctx.measureText(a.chatTxt).width,
                    ctx.globalAlpha = .8 * a.chatA,
                    ctx.fillStyle = HILL_CL,
                    ctx.fillRect(this.x - 1 - n / 2, i + this.y - this.rad - 10 - 5 - 1, n + 2, 12),
                    ctx.fillStyle = "#F1C34C",
                    lowGraphics || (ctx.shadowOffsetX = 1,
                        ctx.shadowOffsetY = 1,
                        ctx.shadowColor = "black"),
                    ctx.globalAlpha = a.chatA,
                    ctx.fillText(a.chatTxt, this.x, i + this.y - this.rad - 10))
            }
            for (e = 0; e < t.length; e++)
                this.chatLines.splice(t[e], 1);
            ctx.restore()
        }
    };
    this.getOutlineColor = function() {
        if (this.isGreenOutlined()) {
            return OUTLINE_EDIBle;
        } else return HILL_CL;
    };
    this.isGreenOutlined = function() {
        return this.oType == O_PLAYER ? 0 < ha[this.type - 1] : 0 < ca[this.oType - 1]
    };
    this.gotChat = function(t) {
        this.chatLines.push({
            chatTxt: t,
            chatFadeT: timeStamp + 4e3,
            chatA: 0
        });
        5 < this.chatLines.length && this.chatLines.splice(this.chatLines.length - 1, 1)
    };
    this.drawOutlinedCircle = function(t, e) {
        var a = this.getOutlineColor();
        lowGraphics && a == HILL_CL || drawCircle(0, 0, this.rad, a);
        drawCircle(0, 0, Math.max(0, this.rad - 1.5), e)
    };
    this.drawAnimal = function(t) {
        var e, a, upgradeText = "",
            i = .08 * this.rad;
        switch (this.type) {
            case MOUSE:
                e = "#9BA9B9";
                a = "mouse";
                break;
            case RABBIT:
                e = "#AA937E";
                a = "rabbit";
                break;
            case PIG:
                e = "#DD6BD4";
                a = "pig";
                break;
            case FOX:
                e = "#FF9D43";
                a = "fox";
                break;
            case DEER:
                e = "#C4773E";
                a = "deer";
                break;
            case LION:
                e = "#f8c923";
                a = "lion";
                break;
            case CHEETAH:
                e = "#CAC05B";
                a = "cheetah";
                break;
            case ZEBRA:
                e = "#FFFFFF";
                a = "zebra";
                break;
            case BEAR:
                e = "#99591C";
                a = "bear";
                break;
            case CROCODIle:
                e = "#30F51C";
                i = .16 * this.rad;
                a = "croc";
                break;
            case RHINO:
                e = "#94a3a9";
                a = "rhino";
                break;
            case HIPPO:
                e = "#945A99";
                a = "hippo";
                break;
            case MOle:
                e = "#4C4A45";
                a = "mole";
                break;
            case DRAGON:
                a = "dragon";
                e = "#22FF8A";
                i = .16 * this.rad;
                //screenText = "UPGRADED to DRAGON! (WOW, you'camx amazing!):\nDominate the lands, fly over hills!";
                break;
            case REDDRAGON:
                a = "reddragon";
                e = "#22FF8A";
                i = .16 * this.rad;
            case SHRIMP:
                e = "#f88e37";
                a = "shrimp";
                break;
            case TROUT:
                e = "#ac8686";
                a = "trout";
                break;
            case CRAB:
                e = "#bf2408";
                a = this.flag_usingAbility ? "crab2" : "crab";
                break;
            case SQUID:
                e = "#40dda4";
                a = "squid";
                break;
            case SHARK:
                e = "#999fc6"; // #FDB9BA
                a = "shark";
                break;
            case STINGRAY:
                e = "#141414";
                a = "stingray";
                break;
            case TURTle:
                e = "#502E1A";
                a = this.flag_usingAbility ? "turtle2" : "turtle";
                break;
            case SEA_HORSE:
                e = "#73BE2F";
                a = "seahorse";
                break;
            case JELLYFISH:
                e = "#FDB9BA"; // #999fc6
                a = "jellyfish";
                break;
            case PUFFERFISH:
                e = "#ab712b";
                a = "pufferfish";
                break;
            case DOLPHIN:
                e = "#697a96";
                a = "dolphin";
                break;
            case DUGONG:
                e = "#8f7788";
                a = "dugong";
                break;
            case HIGHBROW_BOTTleNOSE:
                e = "#2a6955";
                a = "highbrow_bottlenose";
                break;
            case KILleR_WHAle:
                e = "#212021";
                a = "killer_whale";
                break;
            case GIANT_SQUID:
                e = "#127505";
                a = "giant_squid";
                break;
            case BLACK_DRAGON:
                e = "black";
                a = "blackdragon";
                break;
            case YETI:
                e = "white";
                a = "arctic/yeti";
                break;
            case KING_DRAGON:
                e = "black";
                a = "kingdragon"
                break;
            case GOLDEN_SHAHBAZ:
                e = "black";
                a = "goldenshahbaz";
                i = .16 * this.rad;
                break;
            default:
                e = "#00FF00";
                a = "Land Monster";
        }
        ctx.save();
        ctx.rotate(this.angle);
        var n, s = (timeStamp - this.spawnTime) / 1e3;
        n = .7 * Math.sin(2 * Math.PI / 2.5 * s);
        var l = this.flag_underWater || this.flag_usingAbility && this.type == MOle ? .5 : 1;
        this.underwaterA += .1 * (l - this.underwaterA);
        ctx.globalAlpha *= this.underwaterA;
        if (this.flag_invincible) {
            var l = .3,
                r = .5 * (1 - l);
            ctx.globalAlpha *= l + r + r * Math.sin(2 * Math.PI / 1 * ((timeStamp - this.spawnTime) / 1e3))
        }
        this.nameA += .1 * ((this.flag_underWater || this.flag_usingAbility && this.type == MOle ? 0 : 1) - this.nameA);
        l = 2 + n;
        r = 0 < oa[this.type - 1] ? OUTLINE_PREDATOR : 0 < ha[this.type - 1] ? OUTLINE_EDIBle : HILL_CL;
        lowGraphics && r == HILL_CL ? l = 0 : drawCircle(0, 0, this.rad, r);
        n = null;
        a && !noImages && (skins.hasOwnProperty(a) || (skins[a] = new Image,
                skins[a].src = "./skins/" + a + ".png"),
            n = 0 != skins[a].width && skins[a].complete ? skins[a] : null);
        n || (ctx.fillStyle = e,
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - l), 0, 2 * Math.PI),
            ctx.fill());
        if (this.type != RABBIT && this.type != MOUSE && this.type != CRAB) {
            var s = (timeStamp - this.spawnTime) / 1e3,
                a = 4 * Math.sin(2 * Math.PI / 5 * s),
                s = 2.5 * l,
                o = Math.PI / 180;
            ctx.fillStyle = this.flag_tailBitten ? OUTLINE_PREDATOR : 0 < da[this.type - 1] && this.id != MyPlayerId ? OUTLINE_EDIBle : r;
            lowGraphics && ctx.fillStyle != HILL_CL || (ctx.beginPath(),
                ctx.moveTo((this.rad - l + 1) * Math.cos((282.5 + s) * o), (this.rad - l + 1) * Math.sin(282.5 * o)),
                ctx.lineTo((this.rad - l + 1) * Math.cos((257.5 - s) * o), (this.rad - l + 1) * Math.sin(257.5 * o)),
                ctx.lineTo((this.rad + i + l) * Math.cos((270 + a) * o), (this.rad + i + l) * Math.sin((270 + a) * o)),
                ctx.lineTo((this.rad - l + 1) * Math.cos((282.5 + s) * o), (this.rad - l + 1) * Math.sin(282.5 * o)),
                ctx.fill());
            lowGraphics || n && !this.flag_tailBitten || (ctx.fillStyle = this.flag_tailBitten ? OUTLINE_PREDATOR : e,
                ctx.beginPath(),
                ctx.moveTo((this.rad - l) * Math.cos(282.5 * o), (this.rad - l) * Math.sin(282.5 * o)),
                ctx.lineTo((this.rad - l) * Math.cos(257.5 * o), (this.rad - l) * Math.sin(257.5 * o)),
                ctx.lineTo((this.rad + i) * Math.cos((270 + a) * o), (this.rad + i) * Math.sin((270 + a) * o)),
                ctx.lineTo((this.rad - l) * Math.cos(282.5 * o), (this.rad - l) * Math.sin(282.5 * o)),
                ctx.fill())
        }
        null != n && (i = 500 / 340,
            e = this.rad - l,
            ctx.drawImage(n, -e * i, -e * i, 2 * e * i, 2 * e * i));
        this.flag_hurt && (ctx.fillStyle = "rgba(255,0,0,0.3)",
            ctx.beginPath(),
            ctx.arc(0, 0, Math.max(0, this.rad - l), 0, 2 * Math.PI),
            ctx.fill());
        this.type == RHINO && (ctx.fillStyle = "#E5CF79",
            ctx.beginPath(),
            e = this.rad - l,
            i = 1 * e,
            ctx.moveTo(-.16 * e, i),
            ctx.lineTo(0, e * (this.flag_usingAbility ? 1.41 : .7)),
            ctx.lineTo(.153 * e, i),
            ctx.closePath(),
            ctx.fill());
        n || (this.type == HIPPO ? (ctx.beginPath(),
            ctx.arc(.2 * this.rad, .7 * this.rad, Math.max(0, .55 * this.rad - l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.2 * -this.rad, .7 * this.rad, Math.max(0, .55 * this.rad - l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.fillStyle = "#8C96A6",
            ctx.beginPath(),
            ctx.arc(-(.29 * this.rad), .7 * this.rad + 10, Math.max(0, 3 - l / 2), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.29 * this.rad, .7 * this.rad + 10, Math.max(0, 3 - l / 2), 0, 2 * Math.PI),
            ctx.fill()) : this.type == CHEETAH ? (ctx.fillStyle = "#B5AE4C",
            ctx.beginPath(),
            ctx.arc(.1 * this.rad, -.45 * this.rad, .13 * this.rad, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(-.4 * this.rad, -.2 * this.rad, .12 * this.rad, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.15 * this.rad, -.25 * this.rad, .16 * this.rad, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.63 * this.rad, -.4 * this.rad, .1 * this.rad, 0, 2 * Math.PI),
            ctx.fill()) : this.type == ZEBRA ? (ctx.fillStyle = "#000000",
            e = Math.max(0, this.rad - l),
            l = 0,
            ctx.beginPath(),
            ctx.moveTo(1 * -e, 0 + l),
            ctx.lineTo(0, .2 * -e + l),
            ctx.lineTo(1 * e, 0 + l),
            ctx.lineTo(0, .1 * e + l),
            ctx.closePath(),
            ctx.fill(),
            l -= .3 * this.rad,
            ctx.beginPath(),
            ctx.moveTo(.8 * -e, 0 + l),
            ctx.lineTo(0, .2 * -e + l),
            ctx.lineTo(.8 * e, 0 + l),
            ctx.lineTo(0, .1 * e + l),
            ctx.closePath(),
            ctx.fill(),
            l -= .3 * this.rad,
            ctx.beginPath(),
            ctx.moveTo(.7 * -e, 0 + l),
            ctx.lineTo(0, .1 * -e + l),
            ctx.lineTo(.7 * e, 0 + l),
            ctx.lineTo(0, .1 * e + l),
            ctx.closePath(),
            ctx.fill()) : this.type == DEER ? (ctx.fillStyle = "#E5C870",
            ctx.beginPath(),
            l = .35 * -this.rad,
            i = .1 * -this.rad,
            ctx.moveTo(l, i),
            ctx.lineTo(l + .25 * this.rad, i),
            ctx.lineTo(l - .35 * this.rad, i - 15),
            ctx.fill(),
            ctx.beginPath(),
            l = .35 * this.rad,
            i = .1 * -this.rad,
            ctx.moveTo(l, i),
            ctx.lineTo(l - .25 * this.rad, i),
            ctx.lineTo(l + .35 * this.rad, i - 15),
            ctx.fill()) : this.type == BEAR ? (ctx.fillStyle = "black",
            ctx.beginPath(),
            ctx.arc(0, this.rad - 3, Math.max(0, 5 - l / 2), 0, 2 * Math.PI),
            ctx.fill()) : this.type == MOle && (ctx.fillStyle = "#FA2E8D",
            ctx.beginPath(),
            ctx.arc(0, this.rad - 3, Math.max(0, 4 - l / 2), 0, 2 * Math.PI),
            ctx.fill(),
            e = Math.max(0, this.rad + 2.5 - l),
            ctx.fillStyle = "#F64455",
            ctx.beginPath(),
            i = .707 * -e,
            a = .707 * e,
            ctx.arc(i, a, Math.max(0, 5 - l / 2), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(i + 2, a + 2, Math.max(0, 4 - l / 2), 0, 2 * Math.PI),
            ctx.fill(),
            i = .707 * e,
            a = .707 * e,
            ctx.arc(i, a, Math.max(0, 5 - l / 2), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(i - 2, a + 2, Math.max(0, 4 - l / 2), 0, 2 * Math.PI),
            ctx.fill()));
        n || (ctx.save(),
            n = Math.max(1, this.rad / 25),
            ctx.scale(n, n),
            this.drawEyeAtPos(6, .32 * this.rad),
            this.drawEyeAtPos(-6, .32 * this.rad),
            ctx.restore());
        if (this.flag_underWater || this.flag_usingAbility && this.type == MOle)
            ctx.save(),
            ctx.globalAlpha = 1 - this.underwaterA,
            s = (timeStamp - this.spawnTime) / 1e3,
            l = 1 * Math.sin(2 * Math.PI / 1.5 * s),
            this.flag_underWater && (ctx.globalAlpha *= .65),
            ctx.fillStyle = this.flag_underWater ? "#4E71C3" : "#7E6A35",
            n = this.flag_underWater ? .15 * this.rad : .1 * this.rad,
            ctx.beginPath(),
            ctx.arc(-.35 * this.rad, -.33 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.35 * this.rad, -.32 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.35 * this.rad, .36 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(-.35 * this.rad, .35 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
            ctx.fill(),
            this.type == SHARK && (ctx.globalAlpha = 1 - this.underwaterA,
                ctx.fillStyle = "#73799b",
                ctx.beginPath(),
                e = this.rad,
                i = .25 * e,
                ctx.moveTo(-.07 * e, i),
                ctx.lineTo(0, i - .5 * e),
                ctx.lineTo(.35 * e, i),
                ctx.closePath(),
                ctx.fill()),
            this.type == KILleR_WHAle && (ctx.globalAlpha = 1 - this.underwaterA,
                drawCircle(0, .2 * this.rad, .12 * this.rad, "#4D4D4D")),
            this.type == GIANT_SQUID && (ctx.globalAlpha = 1 - this.underwaterA,
                drawCircle(.4 * this.rad, .75 * this.rad, .12 * this.rad, "#598b30"),
                drawCircle(.65 * this.rad, .55 * this.rad, .1 * this.rad, "#64a034"),
                drawCircle(-.4 * this.rad, .75 * this.rad, .12 * this.rad, "#64a034"),
                drawCircle(-.65 * this.rad, .55 * this.rad, .1 * this.rad, "#598b30")),
            ctx.restore();
        ctx.restore();
        l = this.flag_stunned ? 1 : 0;
        this.stunA += .1 * (l - this.stunA);
        .01 < this.stunA && (ctx.save(),
            ctx.rotate(timeStamp % 2500 / 2500 * 2 * Math.PI),
            ctx.globalAlpha = this.stunA,
            n = .2 * this.rad,
            s = (timeStamp - this.spawnTime) / 1000,
            l = (.5 + .07 * n) * Math.sin(2 * Math.PI / 1 * s),
            ctx.fillStyle = "#F3D444",
            ctx.beginPath(),
            ctx.arc(-.22 * this.rad, -.22 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.22 * this.rad, -.22 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(.22 * this.rad, .22 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.beginPath(),
            ctx.arc(-.22 * this.rad, .22 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
            ctx.fill(),
            ctx.restore());
        this.flag_lowWat && (l = .2,
            r = .5 * (.8 - l),
            n = l + r + r * Math.sin(2 * Math.PI / 1.2 * (timeStamp / 1e3)),
            ctx.save(),
            ctx.globalAlpha = n,
            ctx.fillStyle = WATER_DROP_CL,
            ctx.beginPath(),
            ctx.arc(0, this.rad + 5, 5, 0, 2 * Math.PI),
            ctx.fill(),
            ctx.restore());
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        lowGraphics || (ctx.shadowOffsetX = 1,
            ctx.shadowOffsetY = 1,
            ctx.shadowColor = "black");
        ctx.fillStyle = "white";
        ctx.globalAlpha = this.dead ? ctx.globalAlpha * (1 - t) : 1;
        ctx.globalAlpha *= this.nameA;
        yOffset = this.rad + 9;
        if (this.name.startsWith("> AgushaAG <")) ctx.fillStyle = "aqua";
        if (this.name.startsWith("> RussianMоpе[RU] - DEV <")) ctx.fillStyle = "#29319e";
        if (this.name.startsWith("> Street Boy - REAL <")) ctx.fillStyle = "IndianRed";
        if (this.name.startsWith(">> Laziness - REAL <<")) ctx.fillStyle = "IndianRed";
        this.name && !Me && (ctx.font = "10px Arial",
            ctx.fillText(this.name, 0, 0 + yOffset),
            yOffset += 12);
        ctx.restore()
    };
    this.drawEyeAtPos = function(t, e) {
        ctx.beginPath();
        ctx.arc(t, e, 4.5, 0, 2 * Math.PI);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(t - 2, e - 1, .99, 0, 2 * Math.PI);
        ctx.fill()
    };
    this.moveUpdate = function() {
        var t = (timeStamp - this.updateTime) / 1e3 / V,
            t = 0 > t ? 0 : 1 < t ? 1 : t;
        this.dead && 1 <= t && ua.push(this);
        this.x = t * (this.nx - this.ox) + this.ox;
        this.y = t * (this.ny - this.oy) + this.oy;
        this.rad += .1 * (this.nRad - this.rad);
        if (this.oType == O_PLAYER) {
            var e = .1 * this.angleDelta;
            this.angleDelta -= e;
            this.angle += e
        }
        return Math.min(1, t)
    }
}

function drawCircle(t, e, a, i) {
    ctx.fillStyle = i;
    ctx.beginPath();
    ctx.arc(t, e, a, 0, 2 * Math.PI);
    ctx.fill()
}

function MsgReader(t) {
    this.data = t;
    this.offset = 0;
    this.readUInt8 = function() {
        var t = this.data.getUint8(this.offset);
        this.offset += 1;
        return t
    };
    this.readUInt16 = function() {
        try {
            var t = this.data.getUint16(this.offset, false);
            this.offset += 2;
            return t
        } catch (_0x4fed50) {
            return 0
        }
    };
    this.readUInt16 = function() {
        try {
            var t = this.data.getUint16(this.offset, false);
            this.offset += 2;
            return t
        } catch (_0x416960) {
            return 0
        }
    };
    this.readUInt32 = function() {
        var t = this.data.getUint32(this.offset, false);
        this.offset += 4;
        return t
    };
    this.readString = function() {
        for (var t = this.readUInt16(), e = "", a, i = 0; i < t; i++)
            a = this.readUInt8(),
            i != t - 1 && (e += String.fromCharCode(a));
        return Wa(e)
    }
}
/*
function MsgReader(t) {
    this.data = t;
    this.offset = 0;
    this.readUInt8 = function() {
        var t = this.data.getUint8(this.offset);
        this.offset += 1;
        return t
    }
    ;
    this.readUInt16 = function() {
        try {
            var t = this.data.getUint16(this.offset, false);
            this.offset += 2;
            return t
        } catch (t) {
            return 0
        }
    }
    ;
    this.readUInt32 = function() {
        var t = this.data.getUint32(this.offset, false);
        this.offset += 4;
        return t
    }
    ;
    this.readString = function() {
        for (var t = this.readUInt16(), e = "", a, i = 0; i < t; i++)
            a = this.readUInt8(),
            i != t - 1 && (e += String.fromCharCode(a));
        return Wa(e)
    }
}
*/
function MsgWriter(t) {
    this.len = 0;
    this.dataView = new DataView(new ArrayBuffer(t));
    this.writeUInt8 = function(t) {
        this.dataView.setUint8(this.len, t);
        this.len += 1
    };
    this.writeUInt16 = function(t) {
        this.dataView.setUint16(this.len, t, false);
        this.len += 2
    };
    this.writeInt16 = function(t) {
        this.dataView.setInt16(this.len, t, false);
        this.len += 2
    };
    this.writeUInt32 = function(t) {
        this.dataView.setUint32(this.len, t, false);
        this.len += 4
    };
    this.writeString = function(t) {
        t = La(t);
        len = t.length;
        this.writeUInt16(t.length);
        for (var e = 0; e < len; e++)
            this.writeUInt8(t.charCodeAt(e))
    }
}
var qa, Za = 0;

function Ka() {
    ii() && (theWs = ws,
        ws = null,
        theWs.close());
    1 < Za && (v += 1,
        v > s.length - 1 && (v = 0),
        A = s[v],
        $a());
    Ye = false;
    document.getElementById("txtServer").innerHTML = "(" + A.name + ")";
    document.getElementById("connecting").style.visibility = "visible";
    Ii();
    console.log("Connecting to " + A.name);
    ws = new WebSocket("ws://" + A.ip);
    ws.binaryType = "arraybuffer";
    ws.onopen = function() {
        Za = 0;
        document.getElementById("startMenu").style.visibility = "visible";
        document.getElementById("connecting").style.visibility = "hidden";
    };
    ws.onmessage = function(t) {
        handleWsMessage(new DataView(t.data))
    };
    ws.onclose = function(t) {
        this == ws && (Za += 1,
            target_camzoom = aliveInGame = We = false,
            Ye || (qa = setTimeout(function() {
                    Ka()
                }, 2e3),
                document.getElementById("connecting").style.visibility = "visible"))
    };
    ws.onerror = function() {
        console.log("Socket error!")
    }
}
document.getElementById("serverSelect").onchange = Qa;

function Qa() {
    v = document.getElementById("serverSelect").selectedIndex;
    A = s[v];
    $a();
    console.log("Server changed...");
    ii() && ws.close();
    b = false;
    document.getElementById("spawnXpLabel").style.opacity = 0;
    P = I = null;
    Ka()
}

function $a() {
    if (window.localStorage)
        try {
            window.localStorage.setItem("lastServerIP", A.ip)
        } catch (t) {}
    document.getElementById("serverSelect").selectedIndex = v
}

function ti() {
    for (var t = document.getElementById("serverSelect"); t.lastChild;)
        t.removeChild(t.lastChild);
    var regTex = document.createElement("optgroup");
    regTex.label = "(Your Ping " + A.ping + "ms)";
    for (var e = -1, a = 0; a < s.length; a++) {
        var i = document.createElement("option");
        i.text = s[a].name + " [" + (0 > s[a].playersCount ? "..." : s[a].playersCount) + " Players]"; // s[a].playersCount
        s[a].ip == A.ip && (e = a);
        t.appendChild(regTex);
        t.add(i);
    } -
    1 == e && (e = 0);
    t.selectedIndex = e
}

function handleWsMessage(t) {
    t = new MsgReader(t);
    switch (t.readUInt8()) {
        case 1:
            nPlayers = t.readUInt16();
            _e = Ya(nPlayers) + " players";
            serverVer = t.readUInt16();
            serverVer > gameVersion ? setTimeout(function() {
                p || (window.onbeforeunload = null);
                console.log("Old client (ver " + gameVersion + "/" + serverVer + ")");
                alert("mope.io has been updated! Servers have restarted, Refresh needed.");
                window.location.reload()
            }, 1500) : (serverVer > gameVersion && console.log("Old server version detected!"),
                document.getElementById("startMenuWrapper").style.display = "block",
                wi(!0));
            break;
        case 2:
            var joinResponse = t.readUInt8();
            if (joinResponse == 1) {
                We || (document.getElementById("startButton").style.visibility = "visible");
                spectating = 2 == t.readUInt8();
                aliveInGame = !spectating;
                target_camzoom = spectating;
                He = We = !0;
                //isDevMode = t.readUInt8();
                MyPlayerId = t.readUInt32();
                myRoomID = t.readUInt16();
                gameW = t.readUInt16(); // gameW
                gameH = t.readUInt16(); // gameH
                camx = o_camx = n_camx = t.readUInt16() / 4;
                camy = o_camy = n_camy = t.readUInt16() / 4;
                n_camzoom = t.readUInt16() / 1e3;
                //isDevMode = t.readUInt8();
                target_camzoom = 1.5 * n_camzoom;
                spectating || di(t);
                spectating || (document.getElementById("startMenuWrapper").style.display = "none", aud(Ja),
                    p || (window.onbeforeunload = function(t) {
                        return "You'camx alive in a game, close mope.io?"
                    }));
                if (!spectating && (G += 1,
                        F += 1,
                        window.localStorage))
                    try {
                        window.localStorage.setItem("gamesSinceAd", F)
                    } catch (t) {}
                b && (t = document.getElementById("spawnXpLabel"),
                    t.style.display = "block",
                    t.style.opacity = 1,
                    t.textContent = "Joined party server :)");
                Di()
            } else if (joinResponse == 0) {
                var serverRespLabel = document.getElementById("spawnXpLabel");
                serverRespLabel.style.display = "block";
                serverRespLabel.style.opacity = 1;
                serverRespLabel.textContent = "Error: server is full!";
                b = false;
                var i = A;
                /*setTimeout(function() {
                    aliveInGame || A != i || (Za = 100,
                    Ka())
                }, 1e3)*/
            } else
                joinResponse == 2 && (t = document.getElementById("spawnXpLabel"),
                    t.style.display = "block",
                    t.style.opacity = 1,
                    t.textContent = "Error: link is invalid/expired!",
                    b = false,
                    t = document.location.href,
                    t = Ua("l", t),
                    t = Ua("s", t),
                    window.history.pushState("", document.title, t),
                    alert("Error, your mope.io party link is invalid/ expired!"),
                    setTimeout(function() {
                        aliveInGame || A != i || ws.close()
                    }, 3e3));
            break;
        case 8:
            var a = t.readUInt8(),
                n = t.readUInt8();
            lbData = [];
            for (wa = 0; wa < n; ++wa)
                lbData.push({
                    rank: t.readUInt8(),
                    name: t.readString(),
                    score: t.readUInt32()
                });
            ci(lbData, 0, a);
            break;
        case 10:
            nPlayers = t.readUInt16();
            _e = Ya(nPlayers) + " players";
            break;
        case 18:
            a = t.readUInt8();
            ra = t.readUInt32();
            switch (a) {
                case MOUSE:
                    screenText = "A little mouse...\n Drink water, eat to grow!";
                    break;
                case RABBIT:
                    screenText = "UPGRADED to rabbit:\nRemember, Eat anything outlined in LIGHT-GREEN!\n (You can now eat MICE!)";
                    break;
                case PIG:
                    screenText = "UPGRADED to PIG:\n You can now eat MUSHROOMS\n+ Pigs move FAST through MUD!";
                    break;
                case FOX:
                    screenText = "UPGRADED to FOX! ,\n (You can hide inside red berry bushes!)";
                    break;
                case DEER:
                    screenText = "UPGRADED to DEER:\n You can Eat LILLYPADS in Lakes/Oceans!";
                    break;
                case MOle:
                    screenText = "UPGRADED to MOle! :\n Go in ANY hiding hole and hold W to dig around!";
                    break;
                case ZEBRA:
                    screenText = "UPGRADED to ZEBRA! :\nYou can eat Mushroom bushes!\n (Often found inside lakes/oceans!)";
                    break;
                case LION:
                    screenText = "UPGRADED to LION:\n Rawr, let's go hunt zebras!";
                    break;
                case CHEETAH:
                    screenText = "UPGRADED to CHEETAH:\n Cheetahs love eating lions.";
                    break;
                case BEAR:
                    screenText = "UPGRADED to BEAR:\n Bears climb through green hills! (And can swim pretty well too)";
                    break;
                case CROCODIle:
                    screenText = "UPGRADED to CROCODIle:\n(Now hide in water spots) + Swim well in Mud & Lakes/Oceans!";
                    break;
                case HIPPO:
                    screenText = "UPGRADED to HIPPO! :\nHippos are great swimmers, dominate the Lakes/Oceans/mud!";
                    break;
                case RHINO:
                    screenText = "UPGRADED to RHINO! :\n Press W to CHARGE with your mighty horn!";
                    break;
                case SHRIMP:
                    screenText = "A little shrimp...\n Eat red berries to grow!\n Red-outlined players can eat you!";
                    break;
                case TROUT:
                    screenText = "UPGRADED to trout:\nRemember, Eat anything outlined in LIGHT-GREEN!\n (You can now eat SHRIMPs!)";
                    break;
                case CRAB:
                    screenText = "UPGRADED to crab! :\n You can eat orange plankton! + Crabs can survive on dry land!\n (On land, Press W to go into your shell!)";
                    break;
                case SQUID:
                    screenText = "UPGRADED to squid! :\n Squids can use INK when injured (press W!) \n+ you can hide in Red Berry bushes!";
                    break;
                case SHARK:
                    screenText = "UPGRADED to SHARK! :\n A vicous predator of the oceans!";
                    break;
                case SEA_HORSE:
                    screenText = "UPGRADED to SEA HORSE! :\n An agile hunter!";
                    break;
                case JELLYFISH:
                    screenText = "UPGRADED to JELLY FISH! :\n This animal can get quite big.";
                    break;
                case TURTle:
                    screenText = "UPGRADED to TURTLE! :\n Lives well on land & water! (On land, Press W to go into your shell!)";
                    break;
                case STINGRAY:
                    screenText = "UPGRADED to STINGRAY! :\n Use electic shock (Release W key!) to shock animals! \n(Takes a few seconds to recharge)";
                    break;
                case DRAGON:
                    screenText = "UPGRADED to DRAGON! (WOW, you amazing!):\nDominate the lands, fly over hills!";
                    break;
                case REDDRAGON:
                    screenText = "UPGRADED to REDDRAGON! (WOW, you amazing!):\nDominate the lands, fly over hills!";
                    break;
                case PUFFERFISH:
                    screenText = "UPGRADED to PUFFERFISH!";
                    break;
                case DOLPHIN:
                    screenText = "UPGRADED to DOLPHIN!";
                    break;
                case DUGONG:
                    screenText = "UPGRADED to DUGONG!";
                    break;
                case HIGHBROW_BOTTleNOSE:
                    screenText = "UPGRADED to HIGHBROW BOTTleNOSE!";
                    break;
                case KILleR_WHAle:
                    screenText = "UPGRADED to KILleR WHAle!";
                    break;
                case GIANT_SQUID:
                    screenText = "UPGRADED to GIANT SQUID!";
                    break;
                case BLACK_DRAGON:
                    screenText = "UPGRADED to Black Dragon!\n Black dragons drink lava instead of water! Black dragons only heal on healing stones/lava!";
                    break;
                case YETI:
                    screenText = "UPGRADED to YETI!\n So it really exists... \n Hold W to turn into snow, release W to freeeeeze!";
                    break;
                case KING_DRAGON:
                    screenText = "UPGRADED to King Dragon\nYou got firestreams that burns your victim alive! но у тебя нету хвоста эф"
                    break;
                case GOLDEN_SHAHBAZ:
                    screenText = "UPGRADED to golden shahbaz:\nRemember, Eat anything outlined in LIGHT-GREEN!\n (You can now eat MICE!)";
                    break;
                default:
                    screenText = "Upgraded to a Glitch!"
            }
            screenTextCol = "white";
            screenTextEndT = +new Date + 7500;
            oa = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                oa[t.readUInt8() - 1] = 1;
            ha = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                ha[t.readUInt8() - 1] = 1;
            da = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                da[t.readUInt8() - 1] = 1;
            ca = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                ca[t.readUInt8() - 1] = 1;
            Dii = [];
            Wi = a == MOUSE || a == SHRIMP;
            for (a = 0; a < oa.length; a++) 0 < oa[a] && 0 == n[a] && (e = new za(0, O_PLAYER, 0, 0, 35), e.type = a + 1, Dii.push(e));
            for (a = 0; a < ha.length; a++) 0 < ha[a] && 0 == s[a] && (e = new za(0, a + 1, 0, 0, 35), Dii.push(e));
            Bi = +new Date + 9e3;
            Cii = 0;
            if (0 < Dii.length)
                for (Oi = 1.2, e = 45 * Math.max(0, Dii.length - 1), Ri = e + 40, a = 0; a < Di.length; a++) n = Dii[a], n.x = n.ox = n.nx = 0 - e / 2 + a / Math.max(1, Dii.length - 1) * e, n.y = n.oy = n.ny = 0, n.nRad = 20;
            break;
        case 14:
            var a = t.readUInt8(),
                s = t.readUInt32();
            switch (a) {
                case 0:
                    screenText = "You were killed by: " + t.readString();
                    screenTextCol = "#F1C34C";
                    screenTextEndT = +new Date + 2500;
                    break;
                case 1:
                    screenText = "Watch out! You were eaten!";
                    screenTextCol = "#F1C34C";
                    screenTextEndT = +new Date + 2500;
                    break;
                case 2:
                    screenText = "You died from a jellyfish sting!";
                    screenTextCol = "#F1C34C";
                    screenTextEndT = +new Date + 3500;
                    break;
                case 3:
                    screenText = "You died from a stingray shock!";
                    screenTextCol = "#F1C34C";
                    screenTextEndT = +new Date + 3500;
                    break;
                case 4:
                    screenText = "You died of thirst :( Don't let your water run out!";
                    screenTextCol = "#F1C34C";
                    screenTextEndT = +new Date + 3500;
                    break;
            }
            /*0 == a || 1 == a ? (screenText = "Watch out! You were eaten!",
            screenTextCol = "#F1C34C",
            screenTextEndT = +new Date + 2500) : 4 == a ? (screenText = "You died of thirst :( Don't let your water run out!",
            screenTextCol = "#F1C34C",
            screenTextEndT = +new Date + 3500) : 2 == a ? (screenText = "You died from a jellyfish sting!",
            screenTextCol = "#F1C34C",
            screenTextEndT = +new Date + 3500) : 3 == a && (screenText = "You died from a stingray shock!",
            screenTextCol = "#F1C34C",
            screenTextEndT = +new Date + 3500);*/
            console.log("died msg");
            aliveInGame = false;
            target_camzoom = !0;
            Ci();
            try {
                p || googletag.pubads().refresh()
            } catch (t) {
                console.log("error refreshing ad: " + t)
            }
            window.setTimeout(function() {
                if (!aliveInGame) {
                    g && O();
                    u && R();
                    document.getElementById("startMenuWrapper").style.display = "block";
                    //aud(Va);
                    Ve = 0 < s ? "You'll spawn with +" + Na(s) + " XP!" : "";
                    je = 0;
                    var t = document.getElementById("spawnXpLabel");
                    t.style.opacity = 0;
                    Ve && setTimeout(function() {
                        aliveInGame || (t.style.display = "block",
                            t.style.opacity = 1)
                    }, 1e3);
                    document.getElementById("spawnXpLabel").textContent = Ve;
                    p || (window.onbeforeunload = null)
                }
            }, 2e3);
            break;
        case 4:
            si(t);
            break;
        case 19:
            a = t.readUInt32();
            if (a = ObjectsData[a])
                t = t.readString(),
                a.gotChat(t);
            break;
        case 22:
            t = t.readString();
            a = Sa(A.ip);
            Pi("mope.io/?s=" + a + "&l=" + t);
            break;
        case 23:
            t = t.readUInt8();
            /*if (aliveInGame) {
                console.log("Event msg");
                switch (t) {
                    screenTextEndT = timeStamp + 2500
                    case 1:
                        screenText = "Ouch! Your tail got bitten!";
                        break;
                    case 2:
                        screenText = "You'lowGraphics been stung by a jellyfish!";
                        break;
                    case 3:
                        screenText = "ZAP! You'lowGraphics been shocked by a STINGRAY!";
                        break;
                    case 5:
                        screenText = "You'lowGraphics been inked!";
                        break;
                }
            }*/
            aliveInGame && (console.log("event msg"),
                1 == t ? (screenText = "Ouch! Your tail got bitten!",
                    screenTextEndT = timeStamp + 2500) : 2 == t ? (screenText = "You'lowGraphics been stung by a jellyfish!",
                    screenTextEndT = timeStamp + 2500) : 3 == t ? (screenText = "ZAP! You'lowGraphics been shocked by a STINGRAY!",
                    screenTextEndT = timeStamp + 2500) : 5 == t && (screenText = "You'lowGraphics been inked!",
                    screenTextEndT = timeStamp + 2500));
            break;
        case 24:
            var msgKind = t.readUInt8();
            if (msgKind == 5) {
                aniChoice_isOpen = !1
            }
            if (msgKind == 0 || msgKind == 1) {
                var joinGameAfterChoice = msgKind == 1;
                var timeoutS = t.readUInt8();
                var numAnis = t.readUInt8();
                aniChoice_isOpen = !0;
                aniChoice_A = 0;
                aniChoice_choiceButtons = [];
                aniChoice_joinGameAfter = joinGameAfterChoice;
                aniChoice_startT = +new Date();
                aniChoice_timeOutT = aniChoice_startT + 1000 * timeoutS;
            }
            break;
    }
}

function wsSendMsg(t) {
    ws.send(t.dataView.buffer)
}

function ii() {
    return null != ws && ws.readyState == ws.OPEN
}
var timeStamp = +new Date,
    pa = +new Date,
    oceanAnimStartT = +new Date;

function si(t) {
    pa = timeStamp = +new Date;
    o_camx = camx;
    o_camy = camy;
    n_camx = t.readUInt16() / 4;
    n_camy = t.readUInt16() / 4;
    n_camzoom = t.readUInt16() / 1e3;
    var e = t.readUInt8();
    _a(e, 1) || (Ne = t.readUInt8(),
        xp = t.readUInt32(),
        Xe = t.readUInt8());
    for (var a = t.readUInt16(), i = 0; i < a; i++) {
        var n = t.readUInt8() // oType
            ,
            s = t.readUInt32() // ID
            ,
            l = t.readUInt16() / 4 // RAD
            ,
            r = t.readUInt16() / 4 // X
            ,
            o = t.readUInt16() / 4 // Y
            ,
            e = t.readUInt8(),
            h = null;
        0 < e && (h = ObjectsData[t.readUInt32()]);
        var d = new za(s, n, r, o, l),
            e = ObjectsData[s];
        delete ObjectsData[s];
        e = fa.indexOf(e); -
        1 != e && fa.splice(e, 1);
        ObjectsData[s] = d;
        fa.push(d);
        h && (d.updateTime = timeStamp,
            d.nx = d.x,
            d.ny = d.y,
            d.ox = h.x,
            d.oy = h.y,
            d.x = h.x,
            d.y = h.y);
        n == O_PLAYER && (e = t.readUInt8(), // AnimalType
            s = t.readString(), // Nick Name
            d.nickName = s,
            d.type = e,
            d.name = s ? s : "mope.io");
        /*n == BIOME_LAND && (
        ww = t.readUInt16(),
        hh = t.readUInt16(),
        d.oceanW = ww,
        d.oceanH = hh,
        console.log(ww),
        console.log(hh)
        )*/
        n == OCEAN_BIOME && (e = t.readUInt16(),
            n = t.readUInt16(),
            d.oceanW = e,
            d.oceanH = n

        )

        //d.oceanNum = r > gameW / 2 ? 1 : 0)
    }
    a = t.readUInt16();
    for (i = 0; i < a; i++) {
        s = t.readUInt32(); // ID
        r = t.readUInt16() / 4; // X
        o = t.readUInt16() / 4; // Y
        l = t.readUInt16() / 10; // RAD
        if (d = ObjectsData[s])
            d.updateTime = timeStamp,
            d.ox = d.x,
            d.oy = d.y,
            d.nx = r,
            d.ny = o,
            d.oRad = d.rad,
            d.nRad = l;
        d && d.oType == O_PLAYER && (r = t.readUInt8(),
            n = t.readUInt16(),
            e = t.readUInt8(),
            //console.log("FlagMsg: " + e),
            //console.log("Angle: " + n),
            d.type = r,
            r = Da(n - 90),
            d.angleDelta = Ra(d.angle, r),
            d.oAngle = d.angle,
            d.flag_inWater = _a(e, 18),
            d.flag_hurt = _a(e, 7),
            d.flag_lowWat = _a(e, 6), // 6
            r = _a(e, 5),
            //console.log(r),
            d.flag_underWater = _a(e, 4), // 16
            d.flag_invincible = _a(e, 8),
            d.flag_usingAbility = _a(e, 2), // 4
            e = _a(e, 0) ? t.readUInt8() : 0,
            d.flag_tailBitten = _a(e, 3),
            d.flag_stunned = _a(e, 1), // 2
            r ? (r = t.readUInt8(),
                .001 > d.hpBarA && (d.hpPer = r),
                d.hpPer_n = r,
                d.hpBarA_n = 1) : d.hpBarA_n = 0);
        /*
        d && d.oType == 18 && (e = t.readUInt8(),
            d.flag_hurt = _a(e, 0),
            d.flag_hurt ? (r = t.readUInt8(),
                d.hpBarA = 1,
                d.hpPer = r,
                .5 > d.hpBarA && (d.hpPer = r),
                d.hpPer_n = r,
                d.hpBarA_n = 1) : d.hpBarA_n = 0);
                */
        d
    }
    a = t.readUInt16();
    for (r = 0; r < a; r++)
        d = t.readUInt32(),
        i = 0 < t.readUInt8() ? t.readUInt32() : 0,
        d = ObjectsData[d],
        i = 0 < i ? ObjectsData[i] : void 0,
        d && (d.dead = !0,
            d.updateTime = timeStamp,
            d.oType != LIGHTniNG && d.oType != SQIUD_INK && (i ? (d.ox = d.x,
                d.oy = d.y,
                d.oRad = d.rad,
                d.nx = i.nx,
                d.ny = i.ny,
                d.nRad = Math.min(d.rad, i.rad),
                d.hp_n = 0) : (d.ox = d.x,
                d.oy = d.y,
                d.oRad = d.rad,
                d.nx = d.x,
                d.ny = d.y,
                d.nRad = 0)))
}

function li(t, e) {
    crossHx = t;
    crossHy = e;
    crossL = 30;
    ctx.beginPath();
    ctx.moveTo(crossHx, crossHy - crossL / 2);
    ctx.lineTo(crossHx, crossHy + crossL / 2);
    ctx.stroke();
    ctx.moveTo(crossHx - crossL / 2, crossHy);
    ctx.lineTo(crossHx + crossL / 2, crossHy);
    ctx.stroke()
}

function grid(e, t, a, i, s, n) {
    if (!lowGraphics) {
        ctx.save();
        var r = a - e,
            l = i - t,
            o = canvasW / 2 / target_camzoom,
            h = canvasH / 2 / target_camzoom;
        e = Math.max(e, camx - o - s + 0);
        t = Math.max(t, camy - h - n + 0);
        a = Math.min(a, camx + o - s - 0);
        i = Math.min(i, camy + h - n - 0);
        ctx.strokeStyle = "black";
        ctx.globalAlpha = .055;
        a -= e;
        fillH = i - t;
        for (i = -.5 + e + (r - e) % 30; i < e + a; i += 30) {
            ctx.beginPath(),
                ctx.moveTo(i, t),
                ctx.lineTo(i, t + fillH),
                ctx.stroke();
        }
        for (dy = -.5 + t + (l - t) % 30; dy < t + fillH; dy += 30) {
            ctx.beginPath(),
                ctx.moveTo(e, dy),
                ctx.lineTo(e + a, dy),
                ctx.stroke(),
                ctx.restore();
        }
    }
}

function fillGrid(x1, y1, x2, y2, curRelX, curRelY) {
    ctx.save();
    var oldFillW = x2 - x1;
    var oldFillH = y2 - y1;
    var testBuffer = 0;
    var scrHalfW = canvasW / 2 / target_camzoom;
    var scrHalfH = canvasH / 2 / target_camzoom;
    x1 = Math.max(x1, camx - scrHalfW - curRelX + testBuffer);
    y1 = Math.max(y1, camy - scrHalfH - curRelY + testBuffer);
    x2 = Math.min(x2, camx + scrHalfW - curRelX - testBuffer);
    y2 = Math.min(y2, camy + scrHalfH - curRelY - testBuffer);
    ctx.strokeStyle = "black";
    ctx.globalAlpha = 0.055;
    var gSize = 30;
    var fillW = x2 - x1;
    var fillH = y2 - y1;

    for (
        var dx = -0.5 + x1 + ((oldFillW - x1) % gSize); dx < x1 + fillW; dx += gSize
    ) {
        ctx.beginPath();
        ctx.moveTo(dx, y1);
        ctx.lineTo(dx, y1 + fillH);
        ctx.stroke();
    }
    for (
        var dy = -0.5 + y1 + ((oldFillH - y1) % gSize); dy < y1 + fillH; dy += gSize
    ) {
        ctx.beginPath();
        ctx.moveTo(x1, dy);
        ctx.lineTo(x1 + fillW, dy);
        ctx.stroke();
    }
    ctx.restore();
}

function ri(e, t, a, i, s, n) {
    if (!lowGraphics) {
        ctx.fillStyle = LAND_CL;
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.save();
        ctx.strokeStyle = "black";
        ctx.globalAlpha = .055;
        ctx.scale(target_camzoom, target_camzoom);
        for (var t = canvasW / target_camzoom, e = canvasH / target_camzoom, a = -.5 + (-camx + t / 2) % 30; a < t; a += 30)
            ctx.beginPath(),
            ctx.moveTo(a, 0),
            ctx.lineTo(a, e),
            ctx.stroke();
        for (a = -.5 + (-camy + e / 2) % 30; a < e; a += 30)
            ctx.beginPath(),
            ctx.moveTo(0, a),
            ctx.lineTo(t, a),
            ctx.stroke();
        ctx.restore()
    }
}

var mapWidth = 250,
    mapHeight = 250;

function di(t) {
    mapWidth = gameW / gameH * mapHeight;
    ae = document.createElement("canvas");
    ae.width = mapWidth;
    ae.height = mapHeight;
    var e = ae.getContext("2d");
    e.globalAlpha = .35;
    e.fillStyle = "#000000";
    e.fillRect(0, 0, ae.width, ae.height);
    for (var a = mapWidth / 200, i = mapHeight / 200, n = t.readUInt16(), s = 0; 2 > s; s++) {
        e.fillStyle = WATER_DROP_CL;
        e.globalAlpha = .5;
        var l = mapWidth / gameW;
        0 == s ? e.fillRect(0 * l, 0 * l, n * l, gameH * l) : e.fillRect((gameW - n) * l, 0 * l, n * l, gameH * l)
    }
    n = t.readUInt16();
    e.fillStyle = "#ff6000";
    for (var i = 0; i < n; i++) {
        var volcanoX = t.readUInt8(),
            volcanoY = t.readUInt8(),
            volcanoRad = 5 * t.readUInt8();
        console.log("X: " + volcanoX);
        console.log("Y: " + volcanoY);
        console.log("RAD: " + volcanoRad);
        e.beginPath();
        e.arc(volcanoX, volcanoY, Math.max(1, mapWidth / gameW * volcanoRad), 0, 2 * Math.PI);
        e.fill();
    }
    n = t.readUInt16(); // t.readUInt16()
    e.fillStyle = WATER_DROP_CL;
    e.globalAlpha = .5;
    for (s = 0; s < n; s++) {
        var l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            o = 5 * t.readUInt8();
        e.beginPath();
        e.arc(l, r, Math.max(1, mapWidth / gameW * o), 0, 2 * Math.PI);
        e.fill()
    }
    n = t.readUInt16();
    e.fillStyle = "#907A33";
    e.globalAlpha = .7;
    for (s = 0; s < n; s++)
        l = t.readUInt8() * a,
        r = t.readUInt8() * i,
        e.beginPath(),
        e.arc(l, r, Math.max(2.5, mapWidth / gameW * 200), 0, 2 * Math.PI),
        e.fill();
    n = t.readUInt16();
    e.fillStyle = HILL_CL;
    e.globalAlpha = 1;
    for (s = 0; s < n; s++)
        l = t.readUInt8() * a,
        r = t.readUInt8() * i,
        e.beginPath(),
        e.arc(l, r, Math.max(1.5, mapWidth / gameW * 50), 0, 2 * Math.PI),
        e.fill();
    n = t.readUInt16();
    e.fillStyle = "#A89937";
    e.globalAlpha = .6;
    for (s = 0; s < n; s++)
        l = t.readUInt8() * a,
        r = t.readUInt8() * i,
        e.beginPath(),
        e.arc(l, r, Math.max(1.5, mapWidth / gameW * 100), 0, 2 * Math.PI),
        e.fill();
    n = t.readUInt16();
    e.fillStyle = BERRY_CL;
    e.globalAlpha = 1;
    for (s = 0; s < n; s++)
        l = t.readUInt8() * a,
        r = t.readUInt8() * i,
        e.beginPath(),
        e.arc(l, r, Math.max(2.5, mapWidth / gameW * 40), 0, 2 * Math.PI),
        e.fill();
    n = t.readUInt16();
    e.fillStyle = CAVIAR_CL;
    e.globalAlpha = 1;
    for (s = 0; s < n; s++)
        l = t.readUInt8() * a,
        r = t.readUInt8() * i,
        e.beginPath(),
        e.arc(l, r, Math.max(2.5, mapWidth / gameW * 40), 0, 2 * Math.PI),
        e.fill();
    n = t.readUInt16();
    e.fillStyle = WATER_DROP_CL;
    e.globalAlpha = 1;
    for (s = 0; s < n; s++)
        l = t.readUInt8() * a,
        r = t.readUInt8() * i,
        e.beginPath(),
        e.arc(l, r, Math.max(2.5, mapWidth / gameW * 50), 0, 2 * Math.PI),
        e.fill()
}

function ci(t, e, a) {
    ee = null;
    if (0 != t.length && boardBar) {
        ee = document.createElement("canvas");
        e = ee.getContext("2d");
        var i;
        i = 55 + 22 * t.length;
        ee.width = 220;
        ee.height = i;
        e.globalAlpha = .35;
        e.fillStyle = "#000000";
        e.fillRect(0, 0, 220, i);
        e.globalAlpha = 1;
        e.fillStyle = "#FFFFFF";
        i = A.name; // Надпись сервера, над топами игроков
        e.font = "27px Arial"; // Размер шрифта i = A.name
        if (!lowGraphics) {
            e.shadowOffsetX = 1, e.shadowOffsetY = 1;
        }
        e.shadowColor = "black";
        //e.fillText(i, ee.width / 2 - e.measureText(i).width / 2, 40)
        e.fillText(i, 95 - e.measureText(i).width / 2, 40);
        var n;
        e.textAlign = "left";
        e.font = "17px Arial";
        for (n = 0; n < t.length; ++n)
            i = Me ? "" : t[n].name || "mope.io",
            a == t[n].rank ? (e.fillStyle = "#FEED92",
                Me && (i = "you")) : e.fillStyle = "#FFFFFF",
            i = t[n].rank + ". " + i + " (" + Na(t[n].score) + ")",
            e.fillText(i, 15, 65 + 22 * n)
    }
}

function fi() {
    ctx.save();
    if (aliveInGame && xpbar) {
        water += .1 * (Ne - water);
        xpPer += .03 * (Xe - xpPer);
        var t = ObjectsData[MyPlayerId];
        t && (aniType = t.type);
        t && aniType == MOle && t.flag_usingAbility;
        t = t && (t.flag_underWater || e);
        var e = 1,
            a = 25 >= water;
        a && (e = .7 + .3 * Math.sin(2 * Math.PI / 1.2 * (timeStamp / 1e3)));
        var i = Math.min(450, .9 * canvasW) * oe,
            n = 30 * oe,
            s = canvasW / 2,
            l = canvasH - 60 * oe;
        ctx.globalAlpha = .35 * e;
        ctx.fillStyle = "#000000";
        ctx.fillRect(s - i / 2, l - n / 2, i, n);
        ctx.globalAlpha = e;
        //ctx.fillStyle = t ? "#8CCEF4" : WATER_DROP_CL;
        ctx.fillStyle = aniType == BLACK_DRAGON ? "#ff6000" : t ? "#8CCEF4" : WATER_DROP_CL;
        ctx.fillRect(s - i / 2, l - n / 2, water / 100 * i, n);
        ctx.fillStyle = pe ? a ? BERRY_CL : "orange" : a ? BERRY_CL : "white";
        ctx.globalAlpha = 1 * e;
        ctx.font = 22 * oe + "px Arial";
        ctx.lineWidth = 1;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "black";
        lowGraphics || (a ? (ctx.shadowOffsetX = 0,
            ctx.shadowOffsetY = 0) : (ctx.shadowOffsetX = 1,
            ctx.shadowOffsetY = 1));
        //Is.setText(ys ? a ? "LOW Air" : "Air" : e && e.type == et ? a ? "LOW Lava" : "Lava" : a ? "LOW Water" : "Water");
        //t ? ctx.fillText(t ? a ? "Low Air" : "Air" : , s, l) : ctx.fillText(a ? "Low Water" : "Water", s, l)
        ctx.fillText(t ? a ? "LOW Air" : "Air" : aniType == BLACK_DRAGON ? a ? "LOW Lava" : "Lava" : a ? "LOW Water" : "Water", s, l);
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.globalAlpha = .35;
        ctx.fillStyle = "#000000";
        l = canvasH - n / 2 - 5;
        i = .9 * canvasW;
        ctx.fillRect(s - i / 2, l - n / 2, i, n);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#F3C553";
        ctx.fillRect(s - i / 2, l - n / 2, xpPer / 100 * i, n); //;
        ctx.fillStyle = "white"; //;
        ctx.globalAlpha = 1; //;
        ctx.shadowColor = "black"; //;
        lowGraphics || (ctx.shadowOffsetX = 1,
            ctx.shadowOffsetY = 1); //;
        ctx.fillText(Na(xp) + " xp (" + Na(ra) + " xp Next Animal)", s, l); // Шкала XP (данные xp, определяет массу до следующего животного)
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        Aa && (Je.draw(),
            qe.draw(),
            Ze.draw(),
            na += .1 * ((Ke ? 1 : 0) - na),
            .005 < na && aliveInGame && (ctx.globalAlpha = .3 * na,
                ctx.beginPath(),
                ctx.arc($e, ta, ia * se, 0, 2 * Math.PI),
                ctx.fillStyle = "#000000",
                ctx.fill(),
                ctx.globalAlpha = .5 * na,
                ctx.beginPath(),
                ctx.arc(ea, aa, ia * se * .57, 0, 2 * Math.PI),
                ctx.fillStyle = "#000000",
                ctx.fill(),
                t = .3 * la,
                la -= t,
                sa += t,
                joystickDistF += .1 * (joystickDistF_n - joystickDistF),
                ctx.save(),
                ctx.translate(canvasW / 2, canvasH / 2),
                ctx.rotate(sa),
                ctx.globalAlpha = .5 * na,
                ctx.beginPath(),
                ctx.fillStyle = "#000000",
                t = 40 * se,
                ObjectsData[MyPlayerId] && (t = (9 + ObjectsData[MyPlayerId].rad) * target_camzoom),
                t *= .1 + .9 * joystickDistF,
                e = 15 * se,
                ctx.moveTo(t + 30 * se * (.2 + .8 * joystickDistF), 0),
                ctx.lineTo(t, e / 2),
                ctx.lineTo(t, -e / 2),
                ctx.closePath(),
                ctx.fill(),
                ctx.restore()))
    }
    ctx.restore()
}
var screenText = "Ready to survive!",
    screenTextCol = "white",
    screenTextEndT = +new Date + 0,
    Dii = [],
    Bi = +new Date + 0,
    Cii = 0,
    Ri = 100,
    Oi = 2,
    Wi = !1,
    aniChoice_choiceButtons = [],
    aniChoice_joinGameAfter = !1,
    aniChoice_isOpen = !1,
    _i = new Image;
_i.src = "img/instr_eatsymbol.png";

function showScreenText(ArgumentText, ArgumentText2) {
    screenText = ArgumentText;
    screenTextEndT = +new Date + ArgumentText2;
};

function drawScreenText() {
    var t = (screenTextEndT - timeStamp) / 1000 / 1;
    t = 0 > t ? 0 : 1 < t ? 1 : t;
    0 >= t || (ctx.save(),
        ctx.save(),
        ctx.translate(canvasW / 2, 0.2 * canvasH),
        ctx.scale(oe, oe),
        ctx.font = "25px Arial",
        ctx.lineWidth = 1,
        ctx.textAlign = "center",
        ctx.textBaseline = "middle",
        lowGraphics || (ctx.shadowOffsetX = 1,
            ctx.shadowOffsetY = 1,
            ctx.shadowColor = "black"),
        ctx.fillStyle = screenTextCol,
        pha = pha = ctx.globalAlpha = t,
        Ha(screenText, 0, 0),
        ctx.restore())
}

function zi() {
    var e = (screenTextEndT - timeStamp) / 1e3 / 1,
        e = 0 > e ? 0 : 1 < e ? 1 : e;
    0 < e && (ctx.save(), ctx.globalAlpha = e, ctx.font = 25 * oe + "px Arial", ctx.lineWidth = 1, ctx.textAlign = "center", ctx.textBaseline = "middle", lowGraphics || (ctx.shadowOffsetX = 1, ctx.shadowOffsetY = 1, ctx.shadowColor = "black"), ctx.fillStyle = screenTextCol, Ha(screenText, canvasW / 2, .2 * canvasH), ctx.restore());
    e = 0 < Bi - timeStamp ? 1 : 0;
    Cii += .1 * (e - Cii);
    if (.01 < Cii && !lowGraphics) {
        if (0 < Dii.length) {
            ctx.save();
            ctx.translate(canvasW / 2, canvasH * (.7 + .5 * (1 - Cii)));
            ctx.scale(Oi * timeStamp, Oi * timeStamp);
            ctx.globalAlpha = .2 * Cii;
            ctx.fillStyle = "black";
            var t = Ri + 15 / Oi,
                a = 40 + 10 / Oi;
            ctx.fillRect(-t / 2, -a / 2, t, a);
            ctx.globalAlpha = Cii;
            for (e = 0; e < Dii.length; e++) {
                var i = Dii[e];
                i.draw()
            }
        }
        0 != _i.width && _i.complete && (e = a / _i.height * Cii, ctx.drawImage(_i, -t / 2 - _i.width * e - 15, -a / 2, _i.width * e, _i.height * e));
        Wi && (ctx.save(), ctx.fillStyle = "#52EB59", ctx.font = 16 * wt + "px Arial", ctx.lineWidth = 1, ctx.textAlign = "center", ctx.textBaseline = "middle", Ct || (ctx.shadowOffsetX = 1, ctx.shadowOffsetY = 1, ctx.shadowColor = "black"), ctx.fillText("Eat LIGHT-GREEN circled stuff: (You can eat red berries!)", 0, -45), ctx.restore());
        ctx.restore()
    }
}

function mi(t) {
    timeStamp = +new Date;
    window.requestAnimationFrame(mi);
    ctx.clearRect(0, 0, canvasW, canvasH);
    t = (timeStamp - pa) / 1e3 / .2;
    t = 0 > t ? 0 : 1 < t ? 1 : t;
    camx = t * (n_camx - o_camx) + o_camx;
    camy = t * (n_camy - o_camy) + o_camy;
    target_camzoom = (25 * target_camzoom + n_camzoom) / camzoom;
    Ei();
    ri();
    zi();
    var minusForEdge = 45;
    //fillGrid(-this.oceanW / 2 + minusForEdge, -this.oceanH / 2 + minusForEdge, this.oceanW / 2 - minusForEdge, this.oceanH / 2 - minusForEdge, this.x, this.y);
    //fillGrid(gameXForScreenX(0), gameYForScreenY(0), gameXForScreenX(canvasW), gameYForScreenY(canvasH), 0, 0);
    ctx.save();
    t = canvasW / 2;
    var e = canvasH / 2;
    ctx.translate(t * (1 - target_camzoom) + (t - camx) * target_camzoom, e * (1 - target_camzoom) + (e - camy) * target_camzoom);
    ctx.scale(target_camzoom, target_camzoom);
    ctx.save();
    He ? (t = 10,
        t = 600,
        ctx.globalAlpha = .5,
        ctx.fillStyle = Z,
        ctx.fillRect(0 - t, 0 - t, gameW + 2 * t, t),
        ctx.fillRect(0 - t, gameH, gameW + 2 * t, t),
        ctx.globalAlpha = .6,
        ctx.fillStyle = WATER_DROP_CL,
        ctx.fillRect(0 - t, -.5, t, gameH + 1),
        ctx.fillRect(gameW, -.5, t, gameH + 1)) : fillGrid(gameXForScreenX(0), gameYForScreenY(0), gameXForScreenX(canvasW), gameYForScreenY(canvasH), 0, 0);
    ctx.restore();
    ua = [];
    for (d = 0; d < fa.length; d++)
        fa[d].updateZ();
    fa.sort(function(t, e) {
        return t.z == e.z ? t.id - e.id : t.z - e.z
    });
    for (d = 0; d < fa.length; d++)
        fa[d].draw();
    if (!Me)
        for (d = 0; d < fa.length; d++)
            "undefined" != typeof fa[d].chatLines && fa[d].drawChat();
    for (d = 0; d < ua.length; d++)
        t = ua[d],
        ObjectsData.hasOwnProperty(t.id) && delete ObjectsData[t.id],
        t = fa.indexOf(t), -1 != t && fa.splice(t, 1);
    ctx.restore();
    aliveInGame && (ee && ee.width && ctx.drawImage(ee, 10 * se, 10 * se, ee.width * oe, ee.height * oe),
        ae && ae.width && ctx.drawImage(ae, canvasW - (10 * se + ae.width * oe), 10 * se, mapWidth * oe, mapHeight * oe),
        t = ObjectsData[MyPlayerId]) && (ctx.fillStyle = "white",
        ctx.beginPath(),
        ctx.arc(canvasW - (10 * se + ae.width * oe) + t.x * ae.width * oe / gameW, 10 * se + t.y * ae.height * oe / gameH, 3, 0, 2 * Math.PI),
        ctx.fill());
    drawScreenText();
    fi();
    370 > xi && aliveInGame || (ctx.save(),
        ctx.font = "15px Arial",
        ctx.lineWidth = 1,
        ctx.textAlign = "right",
        ctx.textBaseline = "bottom",
        lowGraphics || (ctx.shadowOffsetX = 1,
            ctx.shadowOffsetY = 1,
            ctx.shadowColor = "black"),
        ctx.fillStyle = "white",
        ctx.fillText(_e, canvasW - 5, canvasH - 2),
        lowGraphics && (ke += 1,
            1e3 < timeStamp - Ee && (Ee = +new Date,
                Ue = ke + " fps",
                ke = 0,
                console.log("fps: (avg. " + 1e3 * De / (timeStamp - Ce) + ")")),
            De += 1,
            ctx.fillText(Ue, canvasW - 5, canvasH - 45)),
        ctx.restore())
}
window.requestAnimationFrame ? window.requestAnimationFrame(mi) : setInterval(draw, 1e3 / 60);

function wi(t) {
    if (ii() && !aliveInGame) {
        playerName = nickInput.value.replace(/(<([^>]+)>)/gi, "").substring(0, 20);
        var e = 9 + La(playerName).length + 1;
        null != I && null != P && (e += La(P).length + 2);
        mes = new MsgWriter(e);
        mes.writeUInt8(2);
        mes.writeString(playerName);
        mes.writeUInt8(t ? 2 : 1);
        mes.writeUInt16(canvasW);
        mes.writeUInt16(canvasH);
        b ? (mes.writeUInt8(1),
            mes.writeString(P)) : mes.writeUInt8(0);
        wsSendMsg(mes);
        if (!t && window.localStorage)
            try {
                window.localStorage.setItem("nick", playerName + "")
            } catch (t) {}
    }
}
var bi = function() {
    console.log("Video done, joining game!");
    document.getElementById("spawn_cell").play();
    wi(!1)
};

function Ii() {
    document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").style.display = "block",
        document.getElementById("partyLinkClicked").style.display = "none")
}
document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").onclick = function() {
    We && (document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").style.display = "none",
            document.getElementById("partyLinkClicked").style.display = "block"),
        newMsg = new MsgWriter(1),
        newMsg.writeUInt8(22),
        wsSendMsg(newMsg))
});

function Pi(t) {
    var e = document.getElementById("partyLinkTxt");
    e.value = t;
    e.setSelectionRange(0, e.value.length);
    e.focus();
    e.setSelectionRange(0, e.value.length)
}
document.getElementById("partyLinkCopyBut") && (document.getElementById("partyLinkCopyBut").onclick = function() {
    var t = document.getElementById("partyLinkTxt");
    t.focus();
    t.setSelectionRange(0, t.value.length);
    try {
        document.execCommand("copy"),
            partyLinkCopyBut.text = "Copied!",
            setTimeout(function() {
                partyLinkCopyBut.text = "Copy"
            }, 1e3)
    } catch (t) {}
});
document.getElementById("ffa_Mode").onclick = function() {

}

document.getElementById("startButton").onclick = function() {
    Ci();
    var e = gameAudio("audio/click.mp3");
    if (e) try {
        e.play();
    } catch (e) {}!N && We && (X() ? (adplayer.startPreRoll(),
        //document.getElementById("spawn_cell").play();
        N = !0,
        document.getElementById("startMenuWrapper").style.display = "none") : wi(!1))
};
document.getElementById("on_offAudio").onclick = function() {
    sound = !sound;
    SoundInGame();
    try {
        window.localStorage.setItem("options_musicMuted", sound ? 1 : 0)
    } catch (e) {}
}
document.getElementById("settingsButton").onclick = function() {
    var t = document.getElementById("optionsDiv");
    t.style.display = "none" == t.style.display ? "block" : "none";
    console.log("onlick")
};
document.getElementById("options_noImages").onchange = function() {
    if (window.localStorage) {
        noImages = document.getElementById("options_noImages").checked;
        try {
            window.localStorage.setItem("options_noImages", noImages ? 1 : 0)
        } catch (t) {}
        console.log("options_noimages: saved as " + window.localStorage.getItem("options_noImages"))
    }
};
document.getElementById("options_noNames").onchange = function() {
    if (window.localStorage) {
        Me = document.getElementById("options_noNames").checked;
        try {
            window.localStorage.setItem("options_noNames", Me ? 1 : 0)
        } catch (t) {}
        console.log("options_noNames: saved as " + window.localStorage.getItem("options_noNames"))
    }
};
document.getElementById("options_lowGraphics").onchange = function() {
    if (window.localStorage) {
        lowGraphics = document.getElementById("options_lowGraphics").checked;
        try {
            window.localStorage.setItem("options_lowGraphics", lowGraphics ? 1 : 0)
        } catch (t) {}
        ki();
        console.log("options_lowGraphics: saved as " + window.localStorage.getItem("options_lowGraphics"))
    }
};
document.getElementById("options_noJoystick").onchange = function() {
    if (window.localStorage) {
        Ae = document.getElementById("options_noJoystick").checked;
        try {
            window.localStorage.setItem("options_noJoystick", Ae ? 1 : 0)
        } catch (t) {}
        ki();
        console.log("options_noJoystick: saved as " + window.localStorage.getItem("options_noJoystick"))
    }
};
var Mi = document.getElementById("options_leftHanded");
Mi && (Mi.onchange = function() {
    if (window.localStorage) {
        xe = Mi.checked;
        try {
            window.localStorage.setItem("options_leftHanded", xe ? 1 : 0)
        } catch (t) {}
        ki();
        console.log("options_leftHanded: saved as " + window.localStorage.getItem("options_leftHanded"))
    }
});
var vi = false,
    AfkMode = false,
    numAniType = 0;
document.onkeydown = function(e) {
    Ci();
    var KEYS = e.keyCode || e.which;
    //if (9 == e) e.preventDefault();
    if (!vi & aliveInGame)
        switch (KEYS) {
            case 32:
                e.preventDefault();
                pressEvent(cNum_leftClick, true);
                break;
            case 38:
                e.preventDefault();
                pressEvent(cNum_upgrade, true);
                break;
            case 40:
                e.preventDefault();
                pressEvent(cNum_downgrade, true);
                break;
            case 83:
                e.preventDefault();
                pressEvent(pressS, true);
                break;
            case 87:
                e.preventDefault();
                pressEvent(cNum_rightClick, true);
                break;
            case 27:
                e.preventDefault();
                showScreenText("Movement lock (ESC KEY): " + ((AfkMode = !AfkMode) ? "ON" : "OFF"), 2500);
                break;
            case 90:
                e.preventDefault();
                newMsg = new MsgWriter(3 + La("X: " + lastMouseX).length),
                    newMsg.writeUInt8(19),
                    newMsg.writeString("X: " + lastMouseX),
                    wsSendMsg(newMsg);
                newMsg = new MsgWriter(3 + La("Y: " + gameMouseY).length),
                    newMsg.writeUInt8(19),
                    newMsg.writeString("Y: " + gameMouseY),
                    wsSendMsg(newMsg);
                break;
                /*case 38:
                    numAniType++;
                    if (numAniType == 1) {
                    SummonChat();document.getElementById("chatinput").value="ani: 1";SummonChat();SummonChat();document.getElementById("chatinput").value="xp: 0";SummonChat();
                    }
                if (numAniType === 2) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 2";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 50";
                    SummonChat();
                    break;
                }
                if (numAniType === 3) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 3";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 200";
                    SummonChat();
                    break;
                }
                if (numAniType === 4) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 4";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 450";
                    SummonChat();
                    break;
                }
                if (numAniType === 5) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 5";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 1000";
                    SummonChat();
                    break;
                }
                if (numAniType === 6) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 6";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 2100";
                    SummonChat();
                    break;
                }
                if (numAniType === 7) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 7";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 4200";
                    SummonChat();
                    break;
                }
                if (numAniType === 8) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 8";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 7900";
                    SummonChat();
                    break;
                }
                if (numAniType === 9) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 9";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 15000";
                    SummonChat();
                    break;
                }
                if (numAniType === 10) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 10";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 28500";
                    SummonChat();
                    break;
                }
                if (numAniType === 11) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 11";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 54000";
                    SummonChat();
                    break;
                }
                if (numAniType === 12) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 12";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 105000";
                    SummonChat();
                    break;
                }
                if (numAniType === 13) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 13";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 200000";
                    SummonChat();
                    break;
                }
                if (numAniType === 14) {
                    SummonChat();
                    document.getElementById("chatinput").value="ani: 14";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value="xp: 1000000";
                    SummonChat();
                    numAniType = 1;
                    break;
                }
                    break;*/
            case 40:
                e.preventDefault(),
                    numAniType--;
                if (numAniType == 1) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 1";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 0";
                    SummonChat();
                }
                if (numAniType === 2) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 2";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 50";
                    SummonChat();
                    break;
                }
                if (numAniType === 3) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 3";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 200";
                    SummonChat();
                    break;
                }
                if (numAniType === 4) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 4";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 450";
                    SummonChat();
                    break;
                }
                if (numAniType === 5) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 5";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 1000";
                    SummonChat();
                    break;
                }
                if (numAniType === 6) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 6";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 2100";
                    SummonChat();
                    break;
                }
                if (numAniType === 7) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 7";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 4200";
                    SummonChat();
                    break;
                }
                if (numAniType === 8) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 8";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 7900";
                    SummonChat();
                    break;
                }
                if (numAniType === 9) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 9";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 15000";
                    SummonChat();
                    break;
                }
                if (numAniType === 10) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 10";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 28500";
                    SummonChat();
                    break;
                }
                if (numAniType === 11) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 11";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 54000";
                    SummonChat();
                    break;
                }
                if (numAniType === 12) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 12";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 105000";
                    SummonChat();
                    break;
                }
                if (numAniType === 13) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 13";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 200000";
                    SummonChat();
                    break;
                }
                if (numAniType === 14) {
                    SummonChat();
                    document.getElementById("chatinput").value = "ani: 14";
                    SummonChat();
                    SummonChat();
                    document.getElementById("chatinput").value = "xp: 1000000";
                    SummonChat();
                    numAniType = 1;
                    break;
                }
                break;
                break;
            case 107:
            case 187:
                if (TestingMode || false) {
                    camzoom = camzoom - 0.20;
                }
                break;
            case 109:
            case 189:
                if (TestingMode || false) {
                    camzoom = camzoom + 0.20;
                }
                break;
            case 36:
                if (TestingMode || false) {
                    camzoom = 26;
                }
                break;
        }
};

document.onkeyup = function(t) {
    var e = t.keyCode || t.which;
    13 != e || aliveInGame ? aliveInGame && (e = t.keyCode || t.which,
        32 != e || vi ? (87 != e || vi || (t.preventDefault(),
                pressEvent(2, false)),
            13 == e && aliveInGame && SummonChat()) : pressEvent(1, false)) : document.getElementById("startButton").click()
};

function SummonChat() {
    var t = document.getElementById("chatinput");
    if (!vi && aliveInGame)
        console.log("opening chatbox"),
        t.style.visibility = "visible",
        t.focus(),
        vi = !0,
        t.onblur = function() {
            vi && SummonChat()
        };
    else if (vi) {
        console.log("closing chatbox");
        var e = t.value + "";
        vi = false;
        t.style.visibility = "hidden";
        t.blur();
        0 < e.length && aliveInGame && (newMsg = new MsgWriter(3 + La(e).length),
            newMsg.writeUInt8(19),
            newMsg.writeString(e),
            wsSendMsg(newMsg));
        //console.log(e) // Выводит в консоль значения, написанные в чате
        t.value = ""
    }
}
window.onresize = ki;
var xi = 100,
    Ti = 100;

function ki() {
    xi = window.innerWidth;
    Ti = window.innerHeight;
    se = window.devicePixelRatio;
    canvasW = xi * se;
    canvasH = Ti * se;
    te.width = canvasW;
    te.height = canvasH;
    te.style.width = xi + "px";
    te.style.height = Ti + "px";
    document.getElementById("chatinput").style.marginTop = Ti / 2 - 55 + "px";
    Aa && (Je.w = Je.h = 95 * se,
        qe.w = qe.h = 95 * se,
        Ze.w = 60 * se,
        Ze.h = 30 * se,
        Je.x = 25 * se + Je.w / 2,
        Je.y = canvasH - (25 * se + Je.w / 2),
        xe && (Je.x = canvasW - Je.x),
        qe.x = Je.x,
        qe.y = Je.y - (10 * se + qe.w / 2 + Je.w / 2),
        Ze.x = 72.5 * se + 125 * se,
        Ze.y = 15 * se + Ze.h / 2);
    oe = Math.max(canvasW / 1344, canvasH / 756);
    oe = Math.min(1, Math.max(.4, oe * se));
    500 > Math.min(xi, Ti) && (oe = se / 2 * .9);
    ii() && (mes = new MsgWriter(5),
        mes.writeUInt8(17),
        mes.writeUInt16(canvasW),
        mes.writeUInt16(canvasH),
        wsSendMsg(mes))
}
var cNum_leftClick = 1,
    cNum_rightClick = 2,
    cNum_upgrade = 3,
    cNum_downgrade = 4,
    pressS = 5;

function pressEvent(t, e) {
    switch (t) {
        case cNum_leftClick:
            pe != e && ii() && aliveInGame && (e && sendMouseCoords(), mes = new MsgWriter(2), mes.writeUInt8(21), mes.writeUInt8(e ? 1 : 0), wsSendMsg(mes));
            pe = e;
            console.log('Left click!');
            break;
        case cNum_rightClick:
            ye != e && ii() && aliveInGame && (e && sendMouseCoords(), mes = new MsgWriter(2), mes.writeUInt8(20), mes.writeUInt8(e ? 1 : 0), wsSendMsg(mes));
            ye = e;
            console.log('Right click!');
            break;
        case cNum_upgrade:
            pe != e && ii() && aliveInGame && (e && sendMouseCoords(), mes = new MsgWriter(2), mes.writeUInt8(23), mes.writeUInt8(e ? 1 : 0), wsSendMsg(mes));
            pe = e;
            console.log("UP PRESSED!");
            break;
        case pressS:
            if (pressS != e && ii() && aliveInGame)
                e && sendMouseCoords(),
                mes = new MsgWriter(2),
                mes.writeUInt8(22),
                mes.writeUInt8(e ? 1 : 0),
                wsSendMsg(mes);
            pressS = e;
            console.log('S pressed!');
            break;
    }
}
te.addEventListener("gesturestart", function(t) {
    console.log("gesture start!");
    t.preventDefault()
});
te.ontouchstart = function(t) {
    Ci();
    console.log("touch start!");
    if (Aa)
        for (var e = 0; e < t.changedTouches.length; e++) {
            var a = t.changedTouches[e],
                i = Je.testPosHitsButton(a.clientX * se, a.clientY * se);
            if (!Je.pressed && i) {
                t.preventDefault();
                Je.pressed = !0;
                Je.pressedTouchID = a.identifier;
                pressEvent(1, !0);
                return
            }
            i = qe.testPosHitsButton(a.clientX * se, a.clientY * se);
            if (!qe.pressed && i) {
                t.preventDefault();
                qe.pressed = !0;
                qe.pressedTouchID = a.identifier;
                pressEvent(2, !0);
                return
            }
            i = Ze.testPosHitsButton(a.clientX * se, a.clientY * se);
            if (!Ze.pressed && i) {
                t.preventDefault();
                SummonChat();
                return
            }
            if (!Ae && !Ke && aliveInGame) {
                Ke = !0;
                $e = a.clientX * se;
                ta = a.clientY * se;
                ea = $e;
                aa = ta;
                Qe = a.identifier;
                return
            }
        }
    he = t.touches[0].clientX * se;
    de = t.touches[0].clientY * se;
    Ei()
};
te.ontouchmove = function(t) {
    Ci();
    t.preventDefault();
    for (var e = 0; e < t.changedTouches.length; e++) {
        var a = t.changedTouches[e];
        if (a.identifier != Je.pressedTouchID && a.identifier != qe.pressedTouchID && a.identifier != Ze.pressedTouchID)
            if (Ae)
                he = a.clientX * se,
                de = a.clientY * se,
                Ei();
            else if (Ke && a.identifier == Qe) {
            var i = a.clientX * se - $e,
                a = a.clientY * se - ta,
                n = Math.sqrt(i * i + a * a);
            if (0 < n) {
                var i = i / n,
                    a = a / n,
                    n = Math.min(1, n / (ia * se)),
                    s = Math.pow(n, 3);
                .1 > s && (s = 0);
                s *= 300 * se;
                la = Ra(sa, Math.atan2(a, i));
                joystickDistF_n = n;
                ea = $e + ia * se * i * n;
                aa = ta + ia * se * a * n;
                he = canvasW / 2 + i * s;
                de = canvasH / 2 + a * s;
                Ei()
            }
        }
    }
};
te.ontouchend = function(t) {
    console.log("touch end!");
    if (Aa && aliveInGame)
        for (var e = 0; e < t.changedTouches.length; e++) {
            var a = t.changedTouches[e];
            Ke && a.identifier == Qe && (Ke = false,
                Qe = -1);
            Je.pressed && Je.pressedTouchID == a.identifier ? (Je.pressed = false,
                Je.pressedTouchID = -1,
                pressEvent(1, false),
                console.log("run released!")) : qe.pressed && qe.pressedTouchID == a.identifier && (qe.pressed = false,
                qe.pressedTouchID = -1,
                pressEvent(2, false),
                console.log("button released!"))
        }
};
te.ontouchcancel = function(t) {
    console.log("touch cancel");
    te.ontouchend(t)
};
te.ontouchleave = function(t) {
    console.log("touch leave")
};
te.onmousemove = function(t) {
    he = t.clientX * se;
    de = t.clientY * se;
    Ei();
    Ye || Ci()
};
te.onmousedown = function(t) {
    Ci();
    1 == t.which && pressEvent(1, !0);
    3 == t.which && pressEvent(2, !0)
};
te.onmouseup = function(t) {
    1 == t.which && pressEvent(1, false);
    3 == t.which && pressEvent(2, false)
};
te.onblur = function(t) {
    pressEvent(1, false);
    pressEvent(2, false)
};
window.onfocus = function(t) {
    Ci()
};
window.onmouseout = function(t) {
    null == t.toElement && null == t.relatedTarget && (pressEvent(1, false),
        pressEvent(2, false))
};
document.oncontextmenu = document.body.oncontextmenu = function() {
    return !aliveInGame
};

function Ei() {
    var t = canvasW / 2,
        e = canvasH / 2;
    lastMouseX = gameMouseX;
    lastMouseY = gameMouseY;
    gameMouseX = (he - (t - camx * target_camzoom)) / target_camzoom;
    gameMouseY = (de - (e - camy * target_camzoom)) / target_camzoom
}

function screenXForGameX(e) {
    return e * target_camzoom + (canvasW / 2 - camx * target_camzoom);
}

function screenYForGameY(e) {
    return e * target_camzoom + (canvasH / 2 - camy * target_camzoom);
}

function gameXForScreenX(e) {
    return (e - (canvasW / 2 - camx * target_camzoom)) / target_camzoom;
}

function gameYForScreenY(e) {
    return (e - (canvasH / 2 - camy * target_camzoom)) / target_camzoom;
}

function sendMouseCoords() {
    if (AfkMode) {
        var player = ObjectsData[MyPlayerId];
        if (player) {
            gameMouseX = player.x, gameMouseY = player.y;
        } else return;
    }
    ii() && aliveInGame && (.1 < Math.abs(lastMouseX - gameMouseX) || .1 < Math.abs(lastMouseY - gameMouseY)) && (mes = new MsgWriter(6),
        mes.writeUInt8(5),
        mes.writeInt16(gameMouseX),
        mes.writeInt16(gameMouseY),
        wsSendMsg(mes))
}
setInterval(sendMouseCoords, 30);

function Ci() {
    Ge = +new Date;
    Ye && (Ye = false,
        p || (window.onbeforeunload = null),
        document.getElementById("connecting").style.visibility = "visible",
        window.location.reload())
}
setInterval(function() {
    +new Date - Ge > 6e4 * (aliveInGame ? 240 : 10) && !Ye && We && (console.log("Disconnected for afk..."),
        Ye = !0,
        ii() && ws.close())
}, 5e3);

function Di() {
    ki();
    ObjectsData = {};
    fa = [];
    ua = [];
    Ne = water = 100;
    water = Ne = Xe = xpPer = xp = 0;
    //isDevMode = false;
    if (!b) {
        Ve = "";
        var t = document.getElementById("spawnXpLabel");
        t.style.display = Ve ? "block" : "none";
        t.textContent = Ve
    }
    Ze.pressed = false;
    Je.pressed = false;
    Ke = qe.pressed = false
}
window.onload = function() {
    ki();
    if (window.localStorage) {
        var t = document.getElementById("nickInput");
        t.value = window.localStorage.getItem("nick");
        t.setSelectionRange(0, t.value.length);
        Aa || t.focus()
    }
}

();