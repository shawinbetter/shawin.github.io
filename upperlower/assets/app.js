/* UL 2 — upper/lower data, body map, and interactions. */
(function () {
  "use strict";

  const MUSCLES = {
    chest:      { label: "胸大肌" },
    frontDelt:  { label: "三角肌前束" },
    sideDelt:   { label: "三角肌中束" },
    rearDelt:   { label: "三角肌后束" },
    triceps:    { label: "肱三头肌" },
    biceps:     { label: "肱二头肌" },
    brachialis: { label: "肱肌" },
    forearm:    { label: "前臂 / 握力" },
    lats:       { label: "背阔肌" },
    traps:      { label: "斜方肌" },
    rhomboids:  { label: "菱形肌 / 中背" },
    erectors:   { label: "竖脊肌" },
    abs:        { label: "腹直肌" },
    obliques:   { label: "腹斜肌" },
    glutes:     { label: "臀大肌" },
    quads:      { label: "股四头肌" },
    hamstrings: { label: "腘绳肌" },
    adductors:  { label: "内收肌群" },
    calves:     { label: "小腿三头肌" },
    ql:         { label: "腰方肌" },
    hipFlexors: { label: "髂腰肌 / 髋屈肌" },
    serratus:   { label: "前锯肌" },
    rotator:    { label: "肩袖 / 深层稳定" }
  };

  const DAYS = {
    upperA: { label: "上肢 A", en: "UPPER A" },
    lowerA: { label: "下肢 A", en: "LOWER A" },
    upperB: { label: "上肢 B", en: "UPPER B" },
    lowerB: { label: "下肢 B", en: "LOWER B" }
  };

  const alt = (id, name, en, gif, primary, secondary, cue, extra) =>
    Object.assign({ id, name, en, gif, primary, secondary, cue }, extra || {});

  const EXERCISES = {
    upperA: [
      {
        slot: "db-bench", name: "哑铃平板卧推", en: "Dumbbell Bench Press",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "2", rest: "2–3′",
        primary: ["chest", "frontDelt", "triceps"], secondary: ["serratus", "rotator"],
        cue: "肩胛后缩下沉，双脚踩实；哑铃下放到胸侧，前臂接近垂直。推起时呼气，不要顶腰。",
        gif: "db-bench"
      },
      {
        slot: "row", name: "胸支撑器械划船", en: "Chest-Supported Machine Row",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "2", rest: "2′",
        primary: ["lats", "rhomboids", "traps"], secondary: ["rearDelt", "biceps", "forearm"],
        cue: "胸口贴垫，肘向后拉，肩胛先收再拉；不要用腰把重量甩起来。",
        gif: "row"
      },
      {
        slot: "pulldown", name: "高位下拉", en: "Lat Pulldown",
        role: "辅项", badge: "aux", sets: "3", reps: "8–12", rir: "2", rest: "2′",
        primary: ["lats", "biceps", "brachialis"], secondary: ["rhomboids", "traps", "forearm"],
        cue: "胸骨微抬，先沉肩胛再拉；把手拉到锁骨附近，不要后仰甩重量。",
        gif: "pulldown"
      },
      {
        slot: "machine-press", name: "器械推肩", en: "Machine Shoulder Press",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "1–2", rest: "2′",
        primary: ["frontDelt", "sideDelt", "triceps"], secondary: ["chest", "serratus"],
        cue: "座椅调到把手与肩同高或略低，肘在身体前侧 30–45°；背贴靠垫，不塌腰、不耸肩。",
        gif: "machine-press"
      },
      {
        slot: "lateral", name: "哑铃侧平举", en: "Dumbbell Lateral Raise",
        role: "辅项", badge: "aux", sets: "2", reps: "12–15", rir: "1", rest: "60″",
        primary: ["sideDelt"], secondary: ["traps", "rotator"],
        cue: "肘带手，不要耸肩；手臂在肩胛平面略前 30° 抬起，小指略高或与肩平。",
        gif: "lateral"
      },
      {
        slot: "pushdown", name: "绳索三头下压", en: "Cable Triceps Pushdown",
        role: "辅项", badge: "aux", sets: "2", reps: "10–15", rir: "1", rest: "60″",
        primary: ["triceps"], secondary: ["forearm"],
        cue: "肘固定在身侧，只有前臂移动；底部完全伸肘，不要用肩往下压。",
        gif: "pushdown"
      },
      {
        slot: "curl", name: "哑铃弯举", en: "Dumbbell Bicep Curl",
        role: "辅项", badge: "aux", sets: "2", reps: "10–15", rir: "1", rest: "60″",
        primary: ["biceps", "brachialis"], secondary: ["forearm"],
        cue: "肘固定在身侧，顶端停 1 秒，离心慢放；不要用肩摆动。",
        gif: "curl"
      },
      {
        slot: "facepull", name: "绳索面拉", en: "Cable Face Pull",
        role: "辅项", badge: "aux", sets: "2", reps: "12–15", rir: "1", rest: "60″",
        primary: ["rearDelt", "rhomboids"], secondary: ["traps", "rotator"],
        cue: "绳索拉到眉心高度，肘向外打开；不要把重量拉向胸口，也不要耸肩。",
        gif: "facepull"
      }
    ],

    lowerA: [
      {
        slot: "goblet-squat", name: "高脚杯深蹲", en: "Goblet Squat",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "2", rest: "2–3′",
        primary: ["quads", "glutes", "adductors"], secondary: ["erectors", "abs"],
        cue: "哑铃抱在胸前，脚掌三点压地；膝盖跟脚尖同向，下蹲到能保持躯干刚性的深度。",
        gif: "goblet-squat", altLabel: "杠铃替代",
        alts: [
          alt("barbell-squat", "杠铃深蹲", "Barbell Back Squat", "squat", ["quads", "glutes", "adductors"], ["erectors", "abs", "hamstrings"], "脚掌三点压地，膝盖跟脚尖同向；起身时呼气，不要憋气顶。", { sets: "3", reps: "8–12", rest: "3′" })
        ]
      },
      {
        slot: "hip-thrust", name: "杠铃臀推", en: "Barbell Hip Thrust",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "2", rest: "2′",
        primary: ["glutes", "hamstrings"], secondary: ["quads", "abs", "adductors"],
        cue: "肩胛靠在凳边，杠在髋部；顶峰收臀，不要用腰过度后仰。",
        gif: "hip-thrust"
      },
      {
        slot: "split-squat", name: "保加利亚分腿蹲", en: "Bulgarian Split Squat",
        role: "辅项", badge: "func", sets: "3", reps: "8–12 / 腿", rir: "2", rest: "90″",
        primary: ["quads", "glutes", "adductors"], secondary: ["hamstrings", "obliques", "hipFlexors"],
        cue: "前脚踩稳，后脚背搭凳；垂直下蹲，前膝跟脚尖同向。先徒手，再加哑铃。",
        gif: "split-squat"
      },
      {
        slot: "leg-curl", name: "俯卧腿弯举", en: "Lying Leg Curl",
        role: "辅项", badge: "aux", sets: "3", reps: "10–15", rir: "1", rest: "60″",
        primary: ["hamstrings"], secondary: ["calves", "glutes"],
        cue: "髋部贴住垫子，膝轴对准转轴；用腘绳肌把小腿卷向臀部，慢回。",
        gif: "leg-curl"
      },
      {
        slot: "adductor", name: "内收肌器械", en: "Hip Adductor Machine",
        role: "辅项", badge: "aux", sets: "2", reps: "12–15", rir: "1", rest: "60″",
        primary: ["adductors"], secondary: ["glutes", "abs"],
        cue: "坐稳，骨盆中立；用大腿内侧夹合，慢回，不要用过大重量。",
        gif: "adductor"
      },
      {
        slot: "calf", name: "站姿提踵", en: "Standing Calf Raise",
        role: "辅项", badge: "aux", sets: "3", reps: "12–15", rir: "1", rest: "45–60″",
        primary: ["calves"], secondary: ["hamstrings", "glutes"],
        cue: "脚尖朝前，膝盖微屈固定；顶峰停 1 秒，下放到脚跟低于台阶，不要弹震。",
        gif: "calf"
      },
      {
        slot: "deadbug", name: "死虫", en: "Dead Bug",
        role: "功能", badge: "func", sets: "2", reps: "8–10 / 侧", rir: "—", rest: "45″",
        primary: ["abs", "hipFlexors"], secondary: ["obliques"],
        cue: "仰卧，腰椎贴地；对侧手脚缓慢伸展，呼气时肋骨下沉，不要塌腰。",
        gif: "deadbug", last: true
      }
    ],

    upperB: [
      {
        slot: "incline-press", name: "哑铃上斜推", en: "Incline Dumbbell Press",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "2", rest: "2–3′",
        primary: ["chest", "frontDelt", "triceps"], secondary: ["serratus", "rotator"],
        cue: "靠背 30–45°，肩胛后缩下沉；哑铃下放到上胸两侧，前臂接近垂直。",
        gif: "incline-press"
      },
      {
        slot: "pullup", name: "辅助引体向上", en: "Assisted Pull-Up",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "2", rest: "2′",
        primary: ["lats", "biceps", "brachialis"], secondary: ["rhomboids", "traps", "forearm"],
        cue: "先沉肩，再把肘拉向肋骨；用辅助机或弹力带保证 8–12 次全程，不甩腿。",
        gif: "pullup-assisted", altLabel: "下拉替代",
        alts: [
          alt("lat-pulldown", "高位下拉", "Lat Pulldown", "pulldown", ["lats", "biceps", "brachialis"], ["rhomboids", "traps", "forearm"], "胸骨微抬，先沉肩胛再拉；把手拉到锁骨附近，不要后仰甩重量。", { sets: "3", reps: "8–12", rest: "2′" })
        ]
      },
      {
        slot: "row-single", name: "单臂绳索划船", en: "Single-Arm Cable Row",
        role: "辅项", badge: "func", sets: "3", reps: "8–12 / 侧", rir: "2", rest: "90″",
        primary: ["lats", "rhomboids", "traps"], secondary: ["rearDelt", "biceps", "obliques", "forearm"],
        cue: "身体稳定，不要跟着绳索转；肘向髋部拉，顶端停 1 秒。",
        gif: "row-single"
      },
      {
        slot: "rear-delt", name: "反向蝴蝶机", en: "Reverse Pec Deck",
        role: "辅项", badge: "aux", sets: "3", reps: "12–15", rir: "1", rest: "60″",
        primary: ["rearDelt", "rhomboids"], secondary: ["traps", "rotator"],
        cue: "手臂微屈，肘带动向两侧打开；不要耸肩，不要用斜方肌把重量提起来。",
        gif: "reardelt"
      },
      {
        slot: "lateral", name: "哑铃侧平举", en: "Dumbbell Lateral Raise",
        role: "辅项", badge: "aux", sets: "2", reps: "12–15", rir: "1", rest: "60″",
        primary: ["sideDelt"], secondary: ["traps", "rotator"],
        cue: "肘带手，不要耸肩；手臂在肩胛平面略前 30° 抬起，小指略高或与肩平。",
        gif: "lateral"
      },
      {
        slot: "overhead-ext", name: "绳索过顶臂屈伸", en: "Cable Overhead Triceps Extension",
        role: "辅项", badge: "aux", sets: "2", reps: "10–15", rir: "1", rest: "60″",
        primary: ["triceps"], secondary: ["frontDelt", "forearm"],
        cue: "背对低位龙门架，绳索在头后；肘尖朝前，下放到三头有拉伸，再伸肘。",
        gif: "overhead-ext"
      },
      {
        slot: "hammer", name: "锤式弯举", en: "Hammer Curl",
        role: "辅项", badge: "aux", sets: "2", reps: "10–15", rir: "1", rest: "60″",
        primary: ["brachialis", "biceps", "forearm"], secondary: ["brachioradialis"],
        cue: "拇指朝上，肘固定在身侧；不要用肩摆动，补肱肌和肱桡肌。",
        gif: "hammer"
      },
      {
        slot: "pallof", name: "帕洛夫推", en: "Pallof Press",
        role: "功能", badge: "func", sets: "2", reps: "8–12 / 侧", rir: "—", rest: "45″",
        primary: ["obliques", "abs"], secondary: ["glutes", "ql"],
        cue: "侧对绳索，双手从胸前推出，身体不被拉转；推出时呼气，停 2 秒再回。",
        gif: "pallof", last: true
      }
    ],

    lowerB: [
      {
        slot: "trap-deadlift", name: "六角杠硬拉", en: "Trap Bar Deadlift",
        role: "主项", badge: "main", sets: "3", reps: "6–8", rir: "2", rest: "3′",
        primary: ["glutes", "hamstrings", "quads", "erectors"], secondary: ["traps", "forearm", "abs"],
        cue: "站在六角杠中间，脚掌三点压地；腋窝夹紧，脚推地、髋膝同时伸，锁定时站直即可。",
        gif: "trap-deadlift", altLabel: "传统硬拉",
        alts: [
          alt("conventional-deadlift", "传统硬拉", "Conventional Deadlift", "deadlift", ["glutes", "hamstrings", "erectors"], ["lats", "traps", "forearm", "abs"], "杠贴小腿，腋窝夹紧；脚推地、髋膝同时伸，杠走直线。重量比六角杠保守。", { sets: "3", reps: "5–8", rest: "3–4′" })
        ]
      },
      {
        slot: "leg-press", name: "腿举", en: "Leg Press",
        role: "辅项", badge: "aux", sets: "3", reps: "10–15", rir: "2", rest: "2′",
        primary: ["quads", "glutes"], secondary: ["adductors", "hamstrings", "calves"],
        cue: "脚掌踩满踏板，膝盖跟脚尖同向；下放到骨盆不卷起的深度，不要锁死膝盖。",
        gif: "leg-press"
      },
      {
        slot: "walking-lunge", name: "行走弓步", en: "Walking Lunge",
        role: "辅项", badge: "func", sets: "3", reps: "10–12 / 腿", rir: "2", rest: "90″",
        primary: ["quads", "glutes", "adductors"], secondary: ["hamstrings", "obliques", "calves"],
        cue: "步幅以能垂直下沉为准；前膝跟脚尖同向，后膝轻触地。可先徒手，再持哑铃。",
        gif: "walking-lunge"
      },
      {
        slot: "abduction", name: "髋外展机", en: "Hip Abduction Machine",
        role: "辅项", badge: "aux", sets: "3", reps: "12–15", rir: "1", rest: "60″",
        primary: ["glutes"], secondary: ["ql"],
        cue: "坐稳，骨盆中立；用臀侧把膝盖向外打开，慢回，不要用惯性。",
        gif: "abduction"
      },
      {
        slot: "leg-curl", name: "俯卧腿弯举", en: "Lying Leg Curl",
        role: "辅项", badge: "aux", sets: "2", reps: "10–15", rir: "1", rest: "60″",
        primary: ["hamstrings"], secondary: ["calves", "glutes"],
        cue: "髋部贴住垫子，膝轴对准转轴；用腘绳肌把小腿卷向臀部，慢回。",
        gif: "leg-curl"
      },
      {
        slot: "calf", name: "站姿提踵", en: "Standing Calf Raise",
        role: "辅项", badge: "aux", sets: "2", reps: "12–15", rir: "1", rest: "45–60″",
        primary: ["calves"], secondary: ["hamstrings", "glutes"],
        cue: "脚尖朝前，膝盖微屈固定；顶峰停 1 秒，下放到脚跟低于台阶，不要弹震。",
        gif: "calf"
      },
      {
        slot: "farmers", name: "单臂提箱行走", en: "Suitcase Carry",
        role: "功能", badge: "func", sets: "2", reps: "20–30 m / 侧", rir: "—", rest: "60″",
        primary: ["forearm", "traps", "abs"], secondary: ["obliques", "ql", "glutes"],
        cue: "一侧提重，身体不侧倾；肋骨叠在骨盆上，走直线。重量以能保持不歪为准。",
        gif: "farmers", last: true
      }
    ]
  };

  const BODY_MAP = `
  <svg viewBox="0 0 160 300" aria-label="正面肌群示意">
    <text x="80" y="12" text-anchor="middle" class="bm-label">FRONT</text>
    <g class="bm-outline">
      <circle cx="80" cy="34" r="13"/>
      <rect x="72" y="47" width="16" height="10" rx="4"/>
      <path d="M58 60 Q80 52 102 60 L99 116 Q96 142 80 148 Q64 142 61 116 Z"/>
      <path d="M58 62 L45 101 L40 139 L46 141 L53 104 L66 78 Z"/>
      <path d="M102 62 L115 101 L120 139 L114 141 L107 104 L94 78 Z"/>
      <path d="M66 146 L62 205 L65 266 L74 266 L77 205 L80 160 L83 205 L86 266 L95 266 L98 205 L94 146 Z"/>
    </g>
    <g class="muscle" data-muscle="frontDelt"><ellipse cx="60" cy="64" rx="8" ry="6"/><ellipse cx="100" cy="64" rx="8" ry="6"/></g>
    <g class="muscle" data-muscle="sideDelt"><ellipse cx="52" cy="67" rx="6" ry="5"/><ellipse cx="108" cy="67" rx="6" ry="5"/></g>
    <g class="muscle" data-muscle="chest"><path d="M64 72 Q73 67 79 74 L79 91 Q70 96 63 87 Z"/><path d="M96 72 Q87 67 81 74 L81 91 Q90 96 97 87 Z"/></g>
    <g class="muscle" data-muscle="serratus"><path d="M62 91 L69 94 L67 102 L61 99 Z"/><path d="M98 91 L91 94 L93 102 L99 99 Z"/></g>
    <g class="muscle" data-muscle="biceps"><ellipse cx="50" cy="86" rx="5" ry="13" transform="rotate(18 50 86)"/><ellipse cx="110" cy="86" rx="5" ry="13" transform="rotate(-18 110 86)"/></g>
    <g class="muscle" data-muscle="forearm"><ellipse cx="43" cy="116" rx="4" ry="14" transform="rotate(12 43 116)"/><ellipse cx="117" cy="116" rx="4" ry="14" transform="rotate(-12 117 116)"/></g>
    <g class="muscle" data-muscle="abs"><rect x="72" y="93" width="7" height="8" rx="2"/><rect x="81" y="93" width="7" height="8" rx="2"/><rect x="72" y="104" width="7" height="8" rx="2"/><rect x="81" y="104" width="7" height="8" rx="2"/><rect x="72" y="115" width="7" height="8" rx="2"/><rect x="81" y="115" width="7" height="8" rx="2"/></g>
    <g class="muscle" data-muscle="obliques"><path d="M63 96 Q69 99 70 113 L67 128 Q61 121 60 109 Z"/><path d="M97 96 Q91 99 90 113 L93 128 Q99 121 100 109 Z"/></g>
    <g class="muscle" data-muscle="hipFlexors"><path d="M68 133 Q76 136 78 141 L74 146 L66 141 Z"/><path d="M92 133 Q84 136 82 141 L86 146 L94 141 Z"/></g>
    <g class="muscle" data-muscle="quads"><ellipse cx="69" cy="176" rx="8" ry="24"/><ellipse cx="91" cy="176" rx="8" ry="24"/></g>
    <g class="muscle" data-muscle="adductors"><ellipse cx="78" cy="180" rx="4" ry="18"/><ellipse cx="82" cy="180" rx="4" ry="18"/></g>
    <g class="muscle" data-muscle="calves"><ellipse cx="67" cy="239" rx="5" ry="17"/><ellipse cx="93" cy="239" rx="5" ry="17"/></g>
  </svg>
  <svg viewBox="0 0 160 300" aria-label="背面肌群示意">
    <text x="80" y="12" text-anchor="middle" class="bm-label">BACK</text>
    <g class="bm-outline">
      <circle cx="80" cy="34" r="13"/>
      <rect x="72" y="47" width="16" height="10" rx="4"/>
      <path d="M58 60 Q80 52 102 60 L99 116 Q96 142 80 148 Q64 142 61 116 Z"/>
      <path d="M58 62 L45 101 L40 139 L46 141 L53 104 L66 78 Z"/>
      <path d="M102 62 L115 101 L120 139 L114 141 L107 104 L94 78 Z"/>
      <path d="M66 146 L62 205 L65 266 L74 266 L77 205 L80 160 L83 205 L86 266 L95 266 L98 205 L94 146 Z"/>
    </g>
    <g class="muscle" data-muscle="traps"><path d="M80 55 L94 65 L86 86 L80 76 L74 86 L66 65 Z"/></g>
    <g class="muscle" data-muscle="rearDelt"><ellipse cx="58" cy="66" rx="8" ry="6"/><ellipse cx="102" cy="66" rx="8" ry="6"/></g>
    <g class="muscle" data-muscle="rhomboids"><path d="M80 82 L91 91 L86 111 L80 120 L74 111 L69 91 Z"/></g>
    <g class="muscle" data-muscle="lats"><path d="M66 84 Q55 96 61 122 L74 116 L78 88 Z"/><path d="M94 84 Q105 96 99 122 L86 116 L82 88 Z"/></g>
    <g class="muscle" data-muscle="triceps"><ellipse cx="48" cy="88" rx="5" ry="14" transform="rotate(18 48 88)"/><ellipse cx="112" cy="88" rx="5" ry="14" transform="rotate(-18 112 88)"/></g>
    <g class="muscle" data-muscle="forearm"><ellipse cx="43" cy="116" rx="4" ry="14" transform="rotate(12 43 116)"/><ellipse cx="117" cy="116" rx="4" ry="14" transform="rotate(-12 117 116)"/></g>
    <g class="muscle" data-muscle="erectors"><rect x="74" y="108" width="4" height="34" rx="2"/><rect x="82" y="108" width="4" height="34" rx="2"/></g>
    <g class="muscle" data-muscle="ql"><path d="M68 128 Q74 130 75 140 L68 143 L64 134 Z"/><path d="M92 128 Q86 130 85 140 L92 143 L96 134 Z"/></g>
    <g class="muscle" data-muscle="glutes"><ellipse cx="72" cy="153" rx="9" ry="8"/><ellipse cx="88" cy="153" rx="9" ry="8"/></g>
    <g class="muscle" data-muscle="hamstrings"><ellipse cx="69" cy="180" rx="8" ry="23"/><ellipse cx="91" cy="180" rx="8" ry="23"/></g>
    <g class="muscle" data-muscle="adductors"><ellipse cx="78" cy="183" rx="4" ry="15"/><ellipse cx="82" cy="183" rx="4" ry="15"/></g>
    <g class="muscle" data-muscle="calves"><ellipse cx="67" cy="239" rx="5" ry="17"/><ellipse cx="93" cy="239" rx="5" ry="17"/></g>
    <g class="muscle" data-muscle="rotator"><circle cx="56" cy="57" r="3"/><circle cx="104" cy="57" r="3"/></g>
  </svg>`;

  const STORAGE = { upperA: {}, lowerA: {}, upperB: {}, lowerB: {} };

  function getSlotState(day, slot) {
    if (!STORAGE[day][slot]) STORAGE[day][slot] = { alt: "default" };
    return STORAGE[day][slot];
  }

  function resolveExercise(day, slot) {
    const base = EXERCISES[day].find((ex) => ex.slot === slot);
    if (!base) return null;
    const st = getSlotState(day, slot);
    if (st.alt === "default") return { base, ex: base, st };
    const choice = (base.alts || []).find((a) => a.id === st.alt);
    if (!choice) return { base, ex: base, st };
    return { base, ex: Object.assign({}, base, choice, { slot: base.slot }), st };
  }

  function chips(ex) {
    const p = (ex.primary || []).map((id) => MUSCLES[id] && MUSCLES[id].label).filter(Boolean);
    const s = (ex.secondary || []).map((id) => MUSCLES[id] && MUSCLES[id].label).filter(Boolean);
    return p.map((x) => `<span class="muscle-chip">${x}</span>`).join("") +
      s.map((x) => `<span class="muscle-chip secondary">${x}</span>`).join("");
  }

  function optionsHTML(base, st) {
    if (!base.alts || !base.alts.length) {
      return base.fixed ? `<span class="fixed-note">${base.fixed}</span>` : "";
    }
    const label = base.altLabel || "替换";
    const opts = [`<option value="default"${st.alt === "default" ? " selected" : ""}>默认 · ${base.name}</option>`]
      .concat(base.alts.map((a) => `<option value="${a.id}"${st.alt === a.id ? " selected" : ""}>${a.name}</option>`));
    return `<div class="alt-row"><label>${label}</label><select class="alt-select" data-alt-select="${base.slot}" aria-label="${label}">${opts.join("")}</select></div>`;
  }

  function cardHTML(day, base, ex, st, index) {
    const gifPath = `assets/gifs/${ex.gif}.gif`;
    const replaceBadge = base.alts && base.alts.length ? `<span class="badge">可替换</span>` : "";
    return `
      <article class="exercise-card" data-slot="${base.slot}" data-day="${day}" tabindex="0" aria-label="${ex.name}">
        <div class="ex-top">
          <span class="ex-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="ex-title">
            <h3>${ex.name}<span>${ex.en}</span></h3>
            <div class="ex-badges">
              <span class="badge ${ex.badge}">${ex.role}</span>
              ${replaceBadge}
              <span class="badge">${ex.sets} 组</span>
            </div>
          </div>
        </div>
        <div class="ex-body">
          <figure class="demo-wrap">
            <img class="demo-gif" src="${gifPath}" alt="${ex.name} 动作演示" loading="lazy" decoding="async" width="480" height="320">
            <figcaption class="demo-caption">动作循环</figcaption>
          </figure>
          <div class="ex-info">
            <div class="prescription">
              <div><b>${ex.sets}</b><span>组</span></div>
              <div><b>${ex.reps}</b><span>次数</span></div>
              <div><b>${ex.rir}</b><span>RIR</span></div>
              <div><b>${ex.rest}</b><span>休息</span></div>
            </div>
            <div class="muscle-chips">${chips(ex)}</div>
            <p class="cue">${ex.cue}</p>
            ${ex.load ? `<p class="load-note"><b>起始重量</b> ${ex.load}</p>` : ""}
            ${ex.phaseBrief ? `<div class="phase-brief">${ex.phaseBrief}</div>` : ""}
            ${ex.phase ? `<details class="phase"><summary>8 周详细安排</summary><div class="phase-list">${ex.phase}</div></details>` : ""}
            ${optionsHTML(base, st)}
          </div>
        </div>
      </article>`;
  }

  function renderBodyMaps() {
    document.querySelectorAll("[data-body-map]").forEach((el) => { el.innerHTML = BODY_MAP; });
  }

  function selectMuscles(panel, ex) {
    if (!panel || !ex) return;
    panel.querySelectorAll(".muscle").forEach((el) => el.classList.remove("is-primary", "is-secondary", "is-idle"));
    const primary = new Set(ex.primary || []);
    const secondary = new Set(ex.secondary || []);
    panel.querySelectorAll(".muscle").forEach((el) => {
      const id = el.getAttribute("data-muscle");
      if (primary.has(id)) el.classList.add("is-primary");
      else if (secondary.has(id)) el.classList.add("is-secondary");
      else el.classList.add("is-idle");
    });
    const title = panel.querySelector("[data-map-title]");
    const readout = panel.querySelector("[data-map-readout]");
    if (title) title.textContent = ex.name;
    if (readout) {
      const p = (ex.primary || []).map((id) => MUSCLES[id] && MUSCLES[id].label).filter(Boolean);
      const s = (ex.secondary || []).map((id) => MUSCLES[id] && MUSCLES[id].label).filter(Boolean);
      readout.innerHTML = `<p class="mr-title">${ex.name}</p><div class="mr-list">${p.map((x) => `<span>${x}</span>`).join("")}${s.map((x) => `<span class="is-secondary">${x}</span>`).join("")}</div>`;
    }
    panel.querySelectorAll(".exercise-card").forEach((c) => c.classList.remove("is-active"));
    const card = panel.querySelector(`[data-slot="${ex.slot}"]`);
    if (card) card.classList.add("is-active");
  }

  function renderDay(day) {
    const list = document.querySelector(`[data-list="${day}"]`);
    const panel = document.getElementById(`day-${day}`);
    if (!list || !panel) return;
    const ordered = EXERCISES[day].slice().sort((a, b) => (a.last ? 1 : 0) - (b.last ? 1 : 0));
    list.innerHTML = ordered.map((base, index) => {
      const { ex, st } = resolveExercise(day, base.slot);
      return cardHTML(day, base, ex, st, index);
    }).join("");

    ordered.forEach((base) => {
      const card = list.querySelector(`[data-slot="${base.slot}"]`);
      if (!card) return;
      const { ex } = resolveExercise(day, base.slot);
      card.addEventListener("mouseenter", () => selectMuscles(panel, ex));
      card.addEventListener("focus", () => selectMuscles(panel, ex));
      card.addEventListener("click", (ev) => {
        if (ev.target.closest("select, option, a, button")) return;
        selectMuscles(panel, ex);
      });
      const sel = card.querySelector("[data-alt-select]");
      if (sel) {
        sel.addEventListener("change", () => {
          getSlotState(day, base.slot).alt = sel.value;
          renderDay(day);
          const next = resolveExercise(day, base.slot);
          if (next) selectMuscles(panel, next.ex);
        });
      }
    });
  }

  function selectFirst(day) {
    const base = EXERCISES[day] && EXERCISES[day][0];
    if (!base) return;
    const panel = document.getElementById(`day-${day}`);
    const resolved = resolveExercise(day, base.slot);
    if (panel && resolved) selectMuscles(panel, resolved.ex);
  }

  function switchDay(day) {
    document.querySelectorAll(".day-panel").forEach((panel) => {
      const active = panel.dataset.day === day;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
    document.querySelectorAll(".day-tab").forEach((tab) => {
      const active = tab.dataset.day === day;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
    selectFirst(day);
    if (history.replaceState) history.replaceState(null, "", `#${day}`);
  }

  function init() {
    renderBodyMaps();
    ["upperA", "lowerA", "upperB", "lowerB"].forEach(renderDay);
    selectFirst("upperA");
    document.querySelectorAll(".day-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchDay(tab.dataset.day));
    });
    const hash = (location.hash || "").replace("#", "");
    if (["upperA", "lowerA", "upperB", "lowerB"].includes(hash)) switchDay(hash);
    window.addEventListener("hashchange", () => {
      const next = (location.hash || "").replace("#", "");
      if (["upperA", "lowerA", "upperB", "lowerB"].includes(next)) switchDay(next);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
