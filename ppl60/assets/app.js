/* PPL 70 — data, body map, and interactions. */
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
    push:  { label: "推日", en: "PUSH" },
    pull:  { label: "拉日", en: "PULL" },
    squat: { label: "蹲日", en: "SQUAT" }
  };

  const alt = (id, name, en, gif, primary, secondary, cue, extra) =>
    Object.assign({ id, name, en, gif, primary, secondary, cue }, extra || {});

  const EXERCISES = {
    push: [
      {
        slot: "bench", name: "平板杠铃卧推", en: "Barbell Bench Press",
        role: "主项", badge: "main", sets: "4", reps: "8–12", rir: "2", rest: "3′",
        primary: ["chest", "frontDelt", "triceps"], secondary: ["serratus", "rotator"],
        cue: "肩胛后缩下沉，脚踩实，臀不离凳；杠铃下放到胸骨下缘，前臂接近垂直。推起时呼气，不憋气顶腰。",
        gif: "bench",
        phaseBrief: `<span class="phase-pill volume">P1–P2 4×8–12</span><span class="phase-pill deload">P3 减载 3×8</span><span class="phase-pill strength">P4 顶组 3–5</span>`,
        phase: `<p><b>P1–P2</b> 4×8–12 @RIR 2</p><p><b>P3</b> 减载 3×8 @RIR 3–4</p><p><b>P4</b> 1×3–5 @RIR 1–2 → 3×8–12</p><p><b>P5</b> 4×8–12 @RIR 2（疲劳则 3×8–12）</p><p class="phase-note">P4 的顶组是“重一组”，不是 1RM；有保护者/安全杆再做。P3 所有辅项也减 40–50%。</p>`,
      },
      {
        slot: "incline-press", name: "哑铃上斜推", en: "Incline Dumbbell Press",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "2", rest: "90″",
        primary: ["chest", "frontDelt", "triceps"], secondary: ["serratus", "rotator"],
        cue: "靠背调到 30–45°，肩胛后缩下沉；哑铃下放到上胸两侧，前臂接近垂直。推起时呼气，不要为了幅度塌腰。",
        gif: "incline-press"
      },
      {
        slot: "machine-press", name: "器械推肩", en: "Machine Shoulder Press",
        role: "主项", badge: "main", sets: "3", reps: "8–12", rir: "1–2", rest: "2′",
        primary: ["frontDelt", "sideDelt", "triceps"], secondary: ["chest", "serratus", "rotator"],
        cue: "座椅调到把手与肩同高或略低，肘在身体前侧 30–45°，下放到耳朵附近；背贴靠垫，不塌腰、不耸肩。",
        gif: "machine-press", fixed: "固定：不做坐姿哑铃推肩"
      },
      {
        slot: "chest-accessory", name: "蝴蝶机夹胸", en: "Pec Deck",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "1", rest: "90″",
        primary: ["chest", "frontDelt"], secondary: ["serratus"],
        cue: "胸骨贴靠垫，肘微屈；用胸把两侧把手合到一起，回落时保持张力。不要耸肩或让肩膀前顶。",
        gif: "pec-deck", altLabel: "蝴蝶机 / 双杠",
        alts: [
          alt("dip", "双杠臂屈伸", "Chest Dip", "dip", ["chest", "triceps", "frontDelt"], ["serratus", "rotator"], "身体略前倾，肘向后而不是向外；下放到肩部舒适的位置，不要追求过深。", { sets: "2", reps: "8–12", rir: "2", rest: "90″" })
        ]
      },
      {
        slot: "lateral", name: "哑铃侧平举", en: "Dumbbell Lateral Raise",
        role: "辅项", badge: "aux", sets: "3", reps: "8–12", rir: "1", rest: "60″",
        primary: ["sideDelt"], secondary: ["traps", "rotator"],
        cue: "超级组：与绳索过顶臂屈伸交替，3 组足够。肘带手，不要耸肩；手臂在肩胛平面（略前 30°）抬起，小指略高或与肩平。重量宁轻勿甩，脖子放松。",
        gif: "lateral", altLabel: "替补", superset: true,
        alts: [
          alt("y-raise", "俯身 Y举", "Prone Y Raise", "y-raise", ["rearDelt", "traps", "rhomboids"], ["rotator"], "俯卧或上斜凳，拇指朝上，手臂向斜前方举成 Y；用轻重量，感受肩胛下束和后束。它更偏后束 / 下斜方，不是中束的完全等价替代。", { sets: "3", reps: "8–12", rest: "60″" })
        ]
      },
      {
        slot: "triceps", name: "绳索过顶臂屈伸", en: "Cable Overhead Triceps Extension",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "1–2", rest: "60–90″",
        primary: ["triceps"], secondary: ["frontDelt", "forearm"],
        cue: "背对低位龙门架，绳索在头后；肘尖朝前、不要外张，下放到三头有拉伸，再伸肘。肋骨不要外翻。",
        gif: "overhead-ext"
      },
      {
        slot: "abs-push", name: "斜凳反向卷腹", en: "Decline Reverse Crunch",
        role: "核心", badge: "core", last: true, sets: "2", reps: "8–12", rir: "1–2", rest: "45″",
        primary: ["abs", "hipFlexors"], secondary: ["obliques"],
        cue: "斜凳调到 15–20°，躺下握住把手；先卷骨盆，再把膝盖卷向胸口。腰椎贴垫，不要用惯性甩腿。",
        gif: "decline-reverse-crunch", altLabel: "卷腹变式",
        alts: [
          alt("decline-crunch", "斜凳卷腹", "Decline Crunch", "decline-crunch", ["abs", "obliques"], ["hipFlexors"], "脚固定，胸骨卷向骨盆；不要用手拉头，下放时保持腹部张力。", { sets: "2", reps: "8–12" })
        ]
      }
    ],

    pull: [
      {
        slot: "deadlift", name: "传统硬拉", en: "Conventional Deadlift",
        role: "主项", badge: "main", sets: "3", reps: "3–5", rir: "2", rest: "3–4′",
        primary: ["glutes", "hamstrings", "erectors"], secondary: ["lats", "traps", "forearm", "abs", "adductors"],
        cue: "杠贴小腿，腋窝夹紧，吸气后撑住腹部；脚推地、髋膝同时伸，杠走直线。锁定时站直即可，不要后仰。正式组用助力带，避免混合握。",
        gif: "deadlift",
        phaseBrief: `<span class="phase-pill strength">P1–P2 3×3–5</span><span class="phase-pill deload">P3 2×3</span><span class="phase-pill muted">P4 顶组 3</span>`,
        phase: `<p><b>P1–P2</b> 3×3–5 @RIR 2</p><p><b>P3</b> 减载 2×3 @RIR 3</p><p><b>P4</b> 1×3 @RIR 1–2 → 2×3–5</p><p><b>P5</b> 3×3–5 @RIR 2（疲劳则 2×3）</p><p class="phase-note">只做力量组，不做 8–12 容量组；P4 顶组不是 1RM。</p>`,
      },
      {
        slot: "pullup", name: "对握引体向上", en: "Neutral-Grip Pull-Up",
        role: "辅项", badge: "aux", sets: "3", reps: "8–12", rir: "2", rest: "2′",
        primary: ["lats", "biceps", "brachialis"], secondary: ["rhomboids", "traps", "forearm", "abs"],
        cue: "先沉肩，再把肘拉向肋骨；下巴过杠即可，不要甩腿。握力不够就戴助力带或用辅助机；做不满 8 次就换高位下拉。",
        gif: "pullup",
        alts: [
          alt("wide-pullup", "宽握引体向上", "Wide-Grip Pull-Up", "pullup-wide", ["lats", "biceps"], ["rhomboids", "traps", "forearm"], "握距比肩宽一掌左右，先沉肩再拉；肩前侧不适就换回对握。", { sets: "2", reps: "8–12" }),
          alt("assisted-pullup", "辅助引体向上", "Assisted Pull-Up", "pullup-assisted", ["lats", "biceps", "brachialis"], ["rhomboids", "forearm"], "用辅助机或弹力带，保证 8–12 次全程；不要为了次数把下巴伸出去。", { sets: "3", reps: "8–12" }),
          alt("lat-pulldown", "高位下拉", "Lat Pulldown", "pulldown", ["lats", "biceps", "brachialis"], ["rhomboids", "traps", "forearm"], "胸骨微抬，先沉肩胛再拉；把手拉到锁骨附近，不要后仰甩重量。", { sets: "3", reps: "8–12" })
        ]
      },
      {
        slot: "pulldown", name: "高位下拉", en: "Lat Pulldown",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "1–2", rest: "90″",
        primary: ["lats", "biceps", "brachialis"], secondary: ["rhomboids", "traps", "forearm"],
        cue: "作为引体的补充：胸骨微抬，先沉肩胛再拉；把手拉到锁骨附近，不要后仰甩重量。2 组就够，别把拉日拖长。",
        gif: "pulldown"
      },
      {
        slot: "row", name: "胸支撑器械划船", en: "Chest-Supported Machine Row",
        role: "辅项", badge: "aux", sets: "3", reps: "8–12", rir: "1–2", rest: "2′",
        primary: ["lats", "rhomboids", "traps"], secondary: ["rearDelt", "biceps", "brachialis", "forearm"],
        cue: "胸口贴垫，肘向后拉，肩胛先收再拉；不要用腰把重量甩起来。拉到肘超过躯干即可。",
        gif: "row",
        alts: [
          alt("single-arm-row", "单臂绳索划船", "Single-Arm Cable Row", "row-single", ["lats", "rhomboids", "traps"], ["rearDelt", "biceps", "obliques", "forearm"], "身体稳定，不要跟着绳索转；肘向髋部拉，顶端停 1 秒。", { sets: "3", reps: "8–12 / 侧" })
        ]
      },
      {
        slot: "rear-delt", name: "反向蝴蝶机", en: "Reverse Pec Deck",
        role: "辅项", badge: "aux", sets: "3", reps: "8–12", rir: "1", rest: "60″",
        primary: ["rearDelt", "rhomboids"], secondary: ["traps", "rotator"],
        cue: "手臂微屈，肘带动向两侧打开；不要耸肩，不要用斜方肌把重量提起来。",
        gif: "reardelt",
        alts: [
          alt("face-pull", "绳索面拉", "Cable Face Pull", "facepull", ["rearDelt", "rhomboids"], ["traps", "rotator"], "绳索拉到眉心高度，肘向外打开；不要把重量拉向胸口，也不要耸肩。", { sets: "2", reps: "8–12" }),
          alt("bent-over-fly", "反向飞鸟", "Reverse Fly", "reardelt-dumbbell", ["rearDelt", "rhomboids"], ["traps", "erectors"], "髋铰链俯身，背部平直；肘微屈，用肩后侧把哑铃向两侧打开。", { sets: "2", reps: "8–12" })
        ]
      },
      {
        slot: "biceps", name: "器械牧师凳弯举", en: "Machine Preacher Curl",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "1", rest: "60–90″",
        primary: ["biceps", "brachialis"], secondary: ["forearm"],
        cue: "肘固定在垫上，下放到接近伸直但不锁死；不要用肩把重量抬起来。顶端停 1 秒，离心慢放。",
        gif: "preacher",
        alts: [
          alt("hammer-curl", "锤式弯举", "Hammer Curl", "hammer", ["brachialis", "biceps", "forearm"], ["brachioradialis"], "拇指朝上，肘固定在身侧；不要用肩摆动。补肱肌和肱桡肌。", { sets: "3", reps: "8–12" })
        ]
      },
      {
        slot: "abs-pull", name: "斜凳卷腹", en: "Decline Crunch",
        role: "核心", badge: "core", last: true, sets: "2", reps: "8–12", rir: "1–2", rest: "45″",
        primary: ["abs", "obliques"], secondary: ["hipFlexors"],
        cue: "斜凳调到 15–20°，脚固定；把胸骨卷向骨盆，不是用手拉头。下放时保持腹部张力。",
        gif: "decline-crunch", altLabel: "卷腹变式",
        alts: [
          alt("decline-reverse-crunch", "斜凳反向卷腹", "Decline Reverse Crunch", "decline-reverse-crunch", ["abs", "hipFlexors"], ["obliques"], "躺下握住把手，先卷骨盆，再把膝盖卷向胸口；腰椎贴垫，不要甩腿。", { sets: "2", reps: "8–12" })
        ]
      },
      {
        slot: "carry", name: "农夫行走", en: "Farmer's Walk / Suitcase Carry",
        role: "功能", badge: "func", sets: "2", reps: "30–40 m", rir: "—", rest: "60″",
        primary: ["forearm", "traps", "abs"], secondary: ["obliques", "ql", "glutes"],
        cue: "两侧等重是农夫行走；想练抗侧屈就只提一侧，身体不侧倾，肋骨叠在骨盆上，走直线。",
        gif: "farmers"
      }
    ],

    squat: [
      {
        slot: "squat", name: "杠铃深蹲", en: "Barbell Back Squat",
        role: "主项", badge: "main", sets: "4", reps: "5–8", rir: "2", rest: "3′",
        primary: ["quads", "glutes", "adductors"], secondary: ["erectors", "abs", "hamstrings", "calves"],
        cue: "脚掌三点压地，膝盖跟脚尖同向；下蹲到能保持躯干刚性的深度。起身时呼气，不要憋气顶。杠位以肩背舒适为准。",
        gif: "squat", altLabel: "主项区块",
        phaseBrief: `<span class="phase-pill volume">P1–P2 4×5–8</span><span class="phase-pill deload">P3 2×5</span><span class="phase-pill strength">P4 顶组 3–5</span>`,
        phase: `<p><b>P1–P2</b> 4×5–8 @RIR 2</p><p><b>P3</b> 减载 2×5 @RIR 3</p><p><b>P4</b> 1×3–5 @RIR 1–2 → 3×5–8</p><p><b>P5</b> 4×5–8 @RIR 2（疲劳则 3×5–8）</p>`,
        alts: [
          alt("zercher", "泽奇深蹲", "Zercher Squat", "zercher", ["quads", "glutes", "adductors"], ["erectors", "abs", "biceps", "traps"], "杠放在肘窝，垫毛巾；肘抬高、胸骨向上，先屈髋再屈膝。重量比背蹲轻，别硬追。", { sets: "3", reps: "6–8", rest: "3′", phaseBrief: `<span class="phase-pill volume">P1–P2 3×6–8</span><span class="phase-pill deload">P3 2×6–8</span><span class="phase-pill strength">P4 顶组 3–5</span>`, phase: `<p><b>P1–P2 / P5</b> 3×6–8</p><p><b>P3</b> 2×6–8</p><p><b>P4</b> 1×3–5 → 2×6–8</p>` })
        ]
      },
      {
        slot: "split-squat", name: "保加利亚分腿蹲", en: "Bulgarian Split Squat",
        role: "辅项", badge: "func", sets: "4", reps: "8–12 / 腿", rir: "2", rest: "90″",
        primary: ["quads", "glutes", "adductors"], secondary: ["hamstrings", "obliques", "hipFlexors"],
        cue: "前脚踩稳，后脚背搭凳；垂直下蹲，前膝跟脚尖同向。图中是分腿蹲，后脚垫高即保加利亚。先徒手，再加哑铃。",
        gif: "split-squat", altLabel: "分腿 / 箭步",
        alts: [
          alt("dumbbell-lunge", "哑铃箭步蹲", "Dumbbell Lunge", "dumbbell-lunge", ["quads", "glutes", "adductors"], ["hamstrings", "obliques", "calves"], "前后脚分开，垂直下沉；前膝跟脚尖同向，后膝轻触地。不要用后脚蹬地起身。", { sets: "4", reps: "8–12 / 腿", rest: "90″" })
        ]
      },
      {
        slot: "leg-curl", name: "俯卧腿弯举", en: "Lying Leg Curl",
        role: "辅项", badge: "aux", sets: "4", reps: "8–12", rir: "1", rest: "60″",
        primary: ["hamstrings"], secondary: ["calves", "glutes"],
        cue: "髋部贴住垫子，膝轴对准器械转轴；用腘绳肌把小腿卷向臀部，慢回。重量轻一点，膝痛就停。",
        gif: "leg-curl"
      },
      {
        slot: "adductor", name: "内收肌器械", en: "Hip Adductor Machine",
        role: "辅项", badge: "aux", sets: "2", reps: "8–12", rir: "1", rest: "60″",
        primary: ["adductors"], secondary: ["glutes", "abs"],
        cue: "坐稳，骨盆中立；用大腿内侧夹合，慢回。不要用过大重量，避免腹股沟不适。",
        gif: "adductor"
      },
      {
        slot: "calf", name: "杠铃站姿提踵", en: "Standing Barbell Calf Raise",
        role: "辅项", badge: "aux", sets: "3", reps: "8–12", rir: "1", rest: "45–60″",
        primary: ["calves"], secondary: ["hamstrings", "glutes"],
        cue: "杠铃放在上背，前脚掌踩 2–5 cm 的杠铃片或台阶；顶峰停 1 秒，慢下。用深蹲架保护，不弹震；脖子不适就改哑铃。",
        gif: "barbell-calf", altLabel: "器械替代",
        load: "先空杆 20 kg 做 2 组熟悉平衡；正式组从 30–40 kg 总重开始，8–12 次留 1–2 次余力；能标准做满 12 次再加 5–10 kg。",
        alts: [
          alt("machine-calf", "器械站姿提踵", "Standing Calf Raise", "calf", ["calves"], ["hamstrings", "glutes"], "脚尖朝前，膝盖微屈固定；顶峰停 1 秒，下放到脚跟低于台阶。不要弹震。", { sets: "3", reps: "8–12", rest: "45–60″", load: "按器械配重，8–12 次 RIR 1–2。" })
        ]
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

  const STORAGE = { push: {}, pull: {}, squat: {} };

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
    const supersetBadge = ex.superset ? `<span class="badge">超级组</span>` : "";
    return `
      <article class="exercise-card" data-slot="${base.slot}" data-day="${day}" tabindex="0" aria-label="${ex.name}">
        <div class="ex-top">
          <span class="ex-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="ex-title">
            <h3>${ex.name}<span>${ex.en}</span></h3>
            <div class="ex-badges">
              <span class="badge ${ex.badge}">${ex.role}</span>
              ${replaceBadge}
              ${supersetBadge}
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
            ${ex.phase ? `<details class="phase"><summary>P1–P5 详细安排</summary><div class="phase-list">${ex.phase}</div></details>` : ""}
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
    ["push", "pull", "squat"].forEach(renderDay);
    selectFirst("push");
    document.querySelectorAll(".day-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchDay(tab.dataset.day));
    });
    const hash = (location.hash || "").replace("#", "");
    if (["push", "pull", "squat"].includes(hash)) switchDay(hash);
    window.addEventListener("hashchange", () => {
      const next = (location.hash || "").replace("#", "");
      if (["push", "pull", "squat"].includes(next)) switchDay(next);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
