/* PPL 60 — training data, animated SVG demos, interactions. */
(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     1. Muscle dictionary
     -------------------------------------------------------------------------- */
  const MUSCLES = {
    chest:      { label: "胸大肌", view: "front" },
    frontDelt:  { label: "三角肌前束", view: "front" },
    sideDelt:   { label: "三角肌中束", view: "front" },
    rearDelt:   { label: "三角肌后束", view: "back" },
    triceps:    { label: "肱三头肌", view: "back" },
    biceps:     { label: "肱二头肌", view: "front" },
    brachialis: { label: "肱肌", view: "front" },
    forearm:    { label: "前臂 / 握力", view: "front" },
    lats:       { label: "背阔肌", view: "back" },
    traps:      { label: "斜方肌", view: "back" },
    rhomboids:  { label: "菱形肌 / 中背", view: "back" },
    erectors:   { label: "竖脊肌", view: "back" },
    abs:        { label: "腹直肌", view: "front" },
    obliques:   { label: "腹斜肌", view: "front" },
    glutes:     { label: "臀大肌", view: "back" },
    quads:      { label: "股四头肌", view: "front" },
    hamstrings: { label: "腘绳肌", view: "back" },
    adductors:  { label: "内收肌群", view: "front" },
    calves:     { label: "小腿三头肌", view: "back" },
    ql:         { label: "腰方肌", view: "back" },
    hipFlexors: { label: "髂腰肌 / 髋屈肌", view: "front" },
    serratus:   { label: "前锯肌", view: "front" },
    rotator:    { label: "肩袖 / 深层稳定", view: "back" }
  };

  const DAYS = {
    push:  { label: "推日", en: "PUSH", color: "var(--lime)" },
    pull:  { label: "拉日", en: "PULL", color: "var(--blue)" },
    squat: { label: "蹲日", en: "SQUAT", color: "var(--orange)" }
  };

  /* --------------------------------------------------------------------------
     2. Exercise library
     Base exercise = the slot default. Alternates inherit anything omitted.
     -------------------------------------------------------------------------- */
  const alt = (id, name, en, demo, primary, secondary, cues, extra) =>
    Object.assign({ id, name, en, demo, primary, secondary, cues }, extra || {});

  const EXERCISES = {
    push: [
      {
        slot: "bench",
        name: "平板杠铃卧推",
        en: "Barbell Bench Press",
        role: "主项",
        badge: "main",
        sets: "4",
        reps: "5–8",
        rir: "2",
        rest: "3′",
        primary: ["chest", "frontDelt", "triceps"],
        secondary: ["serratus", "rotator"],
        cues: "肩胛后缩下沉，脚踩实，臀不离凳。杠铃下放到胸骨下缘，前臂接近垂直；推起时呼气，不要憋气顶腰。",
        why: "最能用负荷做渐进超负荷的水平推，放在推日第一位。你的上肢肌肉量已经高于下肢，卧推不需要再加量，优先保证动作质量和加重节奏。",
        demo: "bench",
        fixed: "主项固定 · 4–6 周不换",
        alts: []
      },
      {
        slot: "shoulder-press",
        name: "器械推肩",
        en: "Machine Shoulder Press",
        role: "主项",
        badge: "main",
        sets: "3",
        reps: "8–12",
        rir: "1–2",
        rest: "2′",
        primary: ["frontDelt", "sideDelt", "triceps"],
        secondary: ["chest", "serratus", "rotator"],
        cues: "座椅调到把手与肩同高或略低，肘在身体前侧 30–45°，下放到耳朵附近。背贴靠垫，不塌腰、不耸肩、不咬牙。",
        why: "用器械换稳定，把力气留给三角肌和肱三头肌。放在卧推后：先做最重的水平推，再用稳定轨迹补垂直推。坐姿哑铃推肩需要额外稳定，疲劳时性价比低，所以不排。",
        demo: "machine-press",
        fixed: "固定：不做坐姿哑铃推肩",
        alts: []
      },
      {
        slot: "fly",
        name: "绳索夹胸",
        en: "Cable Chest Fly",
        role: "辅项",
        badge: "aux",
        sets: "2",
        reps: "12–15",
        rir: "1",
        rest: "90″",
        primary: ["chest", "frontDelt"],
        secondary: ["serratus", "biceps"],
        cues: "肘微屈并固定，想象用上臂把胸夹在一起；在胸前停 1 秒，不要让肩膀前顶。重量以能控制离心为准。",
        why: "补胸大肌水平内收的孤立刺激，三头几乎不参与。卧推后做 2 组就够，时间紧时它是最先可以砍的辅项。",
        demo: "fly",
        alts: [
          alt("pec-deck", "蝴蝶机夹胸", "Pec Deck", "fly", ["chest", "frontDelt"], ["serratus"], "胸骨贴靠垫，肘微屈；用胸把两侧把手合到一起，回落时保持张力。", { sets: "2", reps: "12–15" }),
          alt("single-cable-fly", "单臂绳索夹胸", "Single-Arm Cable Fly", "fly-one", ["chest", "frontDelt"], ["obliques", "serratus"], "侧对绳索，另一手扶住固定物；单臂划弧夹向身体中线，身体不要跟着转。", { sets: "2", reps: "12–15 / 侧" })
        ]
      },
      {
        slot: "lateral",
        name: "哑铃侧平举",
        en: "Dumbbell Lateral Raise",
        role: "辅项",
        badge: "aux",
        sets: "3",
        reps: "15–20",
        rir: "1",
        rest: "60″",
        primary: ["sideDelt"],
        secondary: ["traps", "rotator"],
        cues: "肘带手，不要耸肩；手臂在肩胛平面（略前 30°）抬起，小指略高或与肩平。重量宁轻勿甩，脖子放松。",
        why: "中束是肩宽的关键，推肩对中束的刺激有限，所以单独做。高次数、短休息，放在推肩后；如果斜方肌总是抢戏，先降重量。",
        demo: "lateral",
        alts: [
          alt("cable-lateral", "绳索侧平举", "Cable Lateral Raise", "lateral", ["sideDelt"], ["traps", "rotator"], "绳索从身体前侧或后侧起始，肘微屈；全程保持恒定张力，不要用身体晃。", { sets: "3", reps: "12–15 / 侧" }),
          alt("machine-lateral", "器械侧平举", "Machine Lateral Raise", "lateral", ["sideDelt"], ["traps"], "调整座椅让手臂自然下垂，肘部贴住靠垫；用肩把手臂抬起，不要耸肩。", { sets: "3", reps: "12–15" })
        ]
      },
      {
        slot: "triceps",
        name: "绳索过顶臂屈伸",
        en: "Cable Overhead Triceps Extension",
        role: "辅项",
        badge: "aux",
        sets: "2",
        reps: "10–15",
        rir: "1–2",
        rest: "60–90″",
        primary: ["triceps"],
        secondary: ["frontDelt", "forearm"],
        cues: "肘尖朝前，不要外张；下放到头后直到三头有拉伸，再伸肘。肋骨不要外翻，腰别塌。",
        why: "卧推和推肩已经练到三头外侧头 / 内侧头，过顶动作补长头，而且比窄距卧推少一点肩前束疲劳。只做一个三头动作时，它比下压更互补。",
        demo: "overhead-ext",
        alts: [
          alt("pushdown", "绳索下压", "Cable Triceps Pushdown", "pushdown", ["triceps"], ["forearm"], "肘固定在身侧，只有前臂移动；底部完全伸肘，不要用肩往下压。", { sets: "2", reps: "10–15" }),
          alt("dip", "双杠臂屈伸", "Parallel Bar Dip", "dip", ["triceps", "chest"], ["frontDelt", "serratus"], "身体略前倾，肘向后而不是向外；下放到肩部舒适的位置，别追求过深。", { sets: "2", reps: "6–10" })
        ]
      },
      {
        slot: "abs-push",
        name: "绳索卷腹",
        en: "Cable Crunch",
        role: "核心",
        badge: "core",
        sets: "2",
        reps: "10–15",
        rir: "1–2",
        rest: "45″",
        primary: ["abs", "obliques"],
        secondary: ["hipFlexors"],
        cues: "把胸骨卷向骨盆，不是用手拉头；臀部固定，呼气到底，慢回。下巴微收，脖子不要代偿。",
        why: "负重脊柱屈曲，比徒手卷腹更容易渐进超负荷。放在推日最后，不抢主项精力；如果腰不舒服，换成死虫或反向卷腹。",
        demo: "cable-crunch",
        alts: [
          alt("machine-crunch", "器械卷腹", "Machine Crunch", "cable-crunch", ["abs", "obliques"], ["hipFlexors"], "背贴靠垫，用腹肌把胸骨卷向骨盆；不要用手臂拉把手。", { sets: "2", reps: "10–15" }),
          alt("weighted-crunch", "负重卷腹", "Weighted Crunch", "cable-crunch", ["abs", "obliques"], ["hipFlexors"], "抱一片轻杠铃片在胸前，腰椎贴地；只抬起肩胛骨，不要坐起来。", { sets: "2", reps: "12–15" })
        ]
      },
      {
        slot: "pallof",
        name: "帕洛夫推",
        en: "Pallof Press",
        role: "功能",
        badge: "func",
        sets: "2",
        reps: "10 / 侧",
        rir: "—",
        rest: "45″",
        primary: ["obliques", "abs"],
        secondary: ["glutes", "ql"],
        cues: "侧对绳索，双脚与髋同宽；双手从胸前推出，身体不被拉转。推出时呼气，停 2 秒再回。",
        why: "抗旋转是推日最重要的功能补丁：核心把力量传到四肢，同时不牺牲脊柱稳定。它不负责“练大”，但负责让你在单边负重和运动中不散架。",
        demo: "pallof",
        alts: [
          alt("half-kneeling-pallof", "半跪姿帕洛夫推", "Half-Kneeling Pallof Press", "pallof", ["obliques", "abs"], ["glutes", "ql"], "后膝跪地，前脚踩稳；骨盆保持中立，推出时不要让身体转向绳索。", { reps: "8–10 / 侧" }),
          alt("split-stance-pallof", "分腿站姿帕洛夫推", "Split-Stance Pallof Press", "pallof", ["obliques", "abs"], ["glutes", "ql"], "前后脚分开，重心放在前脚；推出时保持肋骨叠在骨盆上。", { reps: "8–10 / 侧" })
        ]
      }
    ],

    pull: [
      {
        slot: "deadlift",
        name: "传统硬拉",
        en: "Conventional Deadlift",
        role: "主项",
        badge: "main",
        sets: "3",
        reps: "3–5",
        rir: "2",
        rest: "3–4′",
        primary: ["glutes", "hamstrings", "erectors"],
        secondary: ["lats", "traps", "forearm", "abs", "adductors"],
        cues: "杠贴小腿，腋窝夹紧，吸气后撑住腹部；脚推地、髋膝同时伸，杠走直线。锁定时站直即可，不要后仰。正式组用助力带，避免混合握。",
        why: "全身后链主项，练髋伸、躯干刚性和握力。放在拉日第一位，但只做 3 个正式组：它很耗恢复，背阔肌的主要训练量交给引体和划船。",
        demo: "deadlift",
        fixed: "主项固定 · 每周最多 1 次大重量",
        alts: []
      },
      {
        slot: "pullup",
        name: "对握引体向上",
        en: "Neutral-Grip Pull-Up",
        role: "辅项",
        badge: "aux",
        sets: "3",
        reps: "6–10",
        rir: "2",
        rest: "2′",
        primary: ["lats", "biceps", "brachialis"],
        secondary: ["rhomboids", "traps", "forearm", "abs"],
        cues: "先沉肩，再把肘拉向肋骨；下巴过杠即可，不要甩腿。握力不够就戴助力带或用辅助机；做不满 6 次就用高位下拉。",
        why: "垂直拉补背阔肌和肱肌。对握对肩更友好，放在硬拉后、划船前，只做 2–3 组；硬拉已经把握力和斜方肌消耗了一部分，所以不做到力竭。",
        demo: "pullup",
        alts: [
          alt("wide-pullup", "宽握引体向上", "Wide-Grip Pull-Up", "pullup", ["lats", "biceps"], ["rhomboids", "traps", "forearm"], "握距比肩宽一掌左右，先沉肩再拉；如果肩前侧不适，换回对握。", { sets: "2", reps: "5–8" }),
          alt("assisted-pullup", "辅助引体向上", "Assisted Pull-Up", "pullup", ["lats", "biceps", "brachialis"], ["rhomboids", "forearm"], "用辅助机或弹力带，保证 6–10 次全程；不要为了次数把下巴伸出去。", { sets: "3", reps: "6–10" }),
          alt("lat-pulldown", "高位下拉", "Lat Pulldown", "pulldown", ["lats", "biceps", "brachialis"], ["rhomboids", "traps", "forearm"], "胸骨微抬，先把肩胛下沉再拉；把手拉到锁骨附近，不要后仰甩重量。", { sets: "3", reps: "8–12" })
        ]
      },
      {
        slot: "row",
        name: "胸支撑器械划船",
        en: "Chest-Supported Machine Row",
        role: "辅项",
        badge: "aux",
        sets: "3",
        reps: "8–12",
        rir: "1–2",
        rest: "2′",
        primary: ["lats", "rhomboids", "traps"],
        secondary: ["rearDelt", "biceps", "brachialis", "forearm"],
        cues: "胸口贴垫，肘向后拉，肩胛先收再拉；不要用腰把重量甩起来。拉到肘超过躯干即可，不必刻意夹到极限。",
        why: "水平拉的主力，胸支撑减少竖脊肌疲劳；和硬拉同一天也不至于把下背榨干。杠铃划船不是必修，原因见下方决策卡。",
        demo: "row",
        alts: [
          alt("single-arm-row", "单臂绳索划船", "Single-Arm Cable Row", "single-row", ["lats", "rhomboids", "traps"], ["rearDelt", "biceps", "obliques", "forearm"], "身体稳定，不要跟着绳索转；肘向髋部拉，顶端停 1 秒。单边动作同时练抗旋转。", { sets: "3", reps: "10–12 / 侧" }),
          alt("barbell-row", "杠铃划船", "Barbell Row", "barbell-row", ["lats", "rhomboids", "traps"], ["rearDelt", "biceps", "erectors", "forearm"], "髋铰链固定躯干角度，杠拉向肚脐；不要靠起身甩重量。硬拉后做它要保守。", { sets: "3", reps: "6–8" }),
          alt("seated-row", "坐姿绳索划船", "Seated Cable Row", "row", ["lats", "rhomboids", "traps"], ["rearDelt", "biceps", "forearm"], "膝盖微屈，躯干基本不动；先收肩胛，再把肘拉向后。", { sets: "3", reps: "10–12" })
        ]
      },
      {
        slot: "rear-delt",
        name: "反向蝴蝶机",
        en: "Reverse Pec Deck",
        role: "辅项",
        badge: "aux",
        sets: "2",
        reps: "12–20",
        rir: "1",
        rest: "60″",
        primary: ["rearDelt", "rhomboids"],
        secondary: ["traps", "rotator"],
        cues: "手臂微屈，肘带动向两侧打开；不要耸肩，不要用斜方肌把重量提起来。想象把肩胛骨向中间“摊开”。",
        why: "后束在推日被忽略，拉日补上。高次数、轻重量，感受肩后侧发力；它不会让肩膀变窄，反而能改善圆肩和推拉平衡。",
        demo: "reardelt",
        alts: [
          alt("face-pull", "绳索面拉", "Cable Face Pull", "facepull", ["rearDelt", "rhomboids"], ["traps", "rotator"], "绳索拉到眉心高度，肘向外打开；不要把重量拉向胸口，也不要耸肩。", { sets: "2", reps: "12–15" }),
          alt("bent-over-fly", "俯身哑铃飞鸟", "Bent-Over Dumbbell Fly", "reardelt", ["rearDelt", "rhomboids"], ["traps", "erectors"], "髋铰链俯身，背部平直；肘微屈，用肩后侧把哑铃向两侧打开。", { sets: "2", reps: "12–15" })
        ]
      },
      {
        slot: "biceps",
        name: "器械牧师凳弯举",
        en: "Machine Preacher Curl",
        role: "辅项",
        badge: "aux",
        sets: "3",
        reps: "8–12",
        rir: "1",
        rest: "60–90″",
        primary: ["biceps", "brachialis"],
        secondary: ["forearm"],
        cues: "肘固定在垫上，下放到接近伸直但不锁死；不要用肩把重量抬起来。顶端停 1 秒，离心慢放。",
        why: "固定肘关节，减少作弊，短头和肱肌刺激好。作为唯一二头动作“够用但不完整”：长头在肩伸展位的拉伸刺激较少，肱桡肌也几乎没练到。每 4–6 周换成锤式或斜托，或在最后加 1–2 组锤式。",
        demo: "curl",
        alts: [
          alt("hammer-curl", "锤式弯举", "Hammer Curl", "hammer-curl", ["brachialis", "biceps", "forearm"], ["brachioradialis"], "拇指朝上，肘固定在身侧；不要用肩摆动。它补肱肌和肱桡肌，是牧师凳的好搭档。", { sets: "3", reps: "10–12" }),
          alt("incline-curl", "斜托哑铃弯举", "Incline Dumbbell Curl", "incline-curl", ["biceps", "brachialis"], ["forearm"], "肩向后打开，让二头长头处于拉伸位；肘不要向前跑，重量轻一点。", { sets: "3", reps: "10–12" }),
          alt("reverse-curl", "反握 EZ 杆弯举", "Reverse EZ-Bar Curl", "reverse-curl", ["brachialis", "forearm", "biceps"], ["brachioradialis"], "掌心向下握杠，手腕保持中立；重量比正常弯举轻，感受前臂和肱肌。", { sets: "2", reps: "10–12" })
        ]
      },
      {
        slot: "abs-pull",
        name: "悬垂举腿",
        en: "Hanging Knee Raise",
        role: "核心",
        badge: "core",
        sets: "2",
        reps: "8–12",
        rir: "1–2",
        rest: "60″",
        primary: ["abs", "hipFlexors"],
        secondary: ["obliques", "forearm", "lats"],
        cues: "先卷骨盆再抬腿，避免只抬大腿；身体不要摆。握不住就用助力带，不要用摆荡换次数。",
        why: "抗伸展 + 髋屈曲，和推日的卷腹互补。挂在拉日最后，握力疲劳可以接受；如果肩或腰不舒服，换反向卷腹。",
        demo: "hanging-knee-raise",
        alts: [
          alt("reverse-crunch", "反向卷腹", "Reverse Crunch", "reverse-crunch", ["abs", "obliques"], ["hipFlexors"], "膝盖朝胸口卷，骨盆后倾；不要用腿甩，腰椎贴地。", { sets: "2", reps: "12–15" }),
          alt("cable-crunch-pull", "绳索卷腹", "Cable Crunch", "cable-crunch", ["abs", "obliques"], ["hipFlexors"], "把胸骨卷向骨盆，不是用手拉头；臀部固定，呼气到底。", { sets: "2", reps: "10–15" })
        ]
      },
      {
        slot: "carry",
        name: "单臂提箱行走",
        en: "Suitcase Carry",
        role: "功能",
        badge: "func",
        sets: "2",
        reps: "20–30 m / 侧",
        rir: "—",
        rest: "60″",
        primary: ["obliques", "ql"],
        secondary: ["forearm", "traps", "glutes", "abs"],
        cues: "一侧提重，身体不侧倾；肋骨叠在骨盆上，走直线。重量以“能保持不歪”为准，不要为了重而缩短步幅。",
        why: "抗侧屈 + 握力 + 单边负重，直接补拉日的功能维度；比额外加一组卷腹更有迁移价值。它也会暴露左右两侧的握力和核心差异。",
        demo: "carry",
        alts: [
          alt("farmer-carry", "双臂农夫行走", "Farmer Carry", "carry", ["forearm", "traps", "abs"], ["obliques", "glutes", "ql"], "两侧等重，肩胛下沉，走直线；不要含胸或耸肩。", { reps: "30–40 m" }),
          alt("pallof-pull", "帕洛夫推", "Pallof Press", "pallof", ["obliques", "abs"], ["glutes", "ql"], "侧对绳索，双手推出，身体不被拉转；停 2 秒再回。", { reps: "10 / 侧" })
        ]
      }
    ],

    squat: [
      {
        slot: "squat",
        name: "杠铃深蹲",
        en: "Barbell Back Squat",
        role: "主项",
        badge: "main",
        sets: "4",
        reps: "5–8",
        rir: "2",
        rest: "3′",
        primary: ["quads", "glutes", "adductors"],
        secondary: ["erectors", "abs", "hamstrings", "calves"],
        cues: "脚掌三点压地，膝盖跟脚尖同向；下蹲到能保持躯干刚性的深度。起身时呼气，不要憋气顶。杠位以肩背舒适为准。",
        why: "下肢主项，能用较大负荷刺激股四头肌和臀。你的下肢肌肉量只到标准范围，蹲日是全身最值得优先保证质量的一天；和泽奇深蹲按 4–6 周区块轮换。",
        demo: "squat",
        alts: [
          alt("zercher", "泽奇深蹲", "Zercher Squat", "zercher", ["quads", "glutes", "adductors"], ["erectors", "abs", "biceps", "traps"], "杠放在肘窝，垫毛巾；肘抬高、胸骨向上，先屈髋再屈膝。重量比背蹲轻，别硬追。", { sets: "3", reps: "6–8", why: "泽奇把负荷放在身体前侧，抗屈曲和上背需求更高，适合功能性目标；但可加载重量低于背蹲，所以作为 4–6 周区块替换，不每周换。" })
        ]
      },
      {
        slot: "rdl",
        name: "罗马尼亚硬拉",
        en: "Romanian Deadlift",
        role: "辅项",
        badge: "aux",
        sets: "3",
        reps: "8–10",
        rir: "2",
        rest: "2′",
        primary: ["hamstrings", "glutes"],
        secondary: ["erectors", "adductors", "forearm"],
        cues: "膝微屈固定，髋向后推；杠贴腿，感到大腿后侧拉伸就停，不要用腰硬折。起身时脚推地、髋向前。",
        why: "不做腿弯举时，RDL 是腘绳肌的主要刺激；离心可控，比大重量硬拉更适合放在蹲日。它和拉日的传统硬拉隔开至少 48 小时。",
        demo: "rdl",
        alts: [
          alt("single-leg-rdl", "单腿罗马尼亚硬拉", "Single-Leg RDL", "rdl", ["hamstrings", "glutes"], ["erectors", "obliques", "adductors"], "单脚站，髋向后推，另一条腿向后伸；骨盆保持水平，不要开门。先徒手再负重。", { sets: "3", reps: "8–10 / 腿" }),
          alt("hip-thrust", "杠铃臀推", "Barbell Hip Thrust", "hip-thrust", ["glutes", "hamstrings"], ["quads", "abs", "adductors"], "肩胛靠在凳边，杠在髋部；顶峰收臀，不要用腰过度后仰。", { sets: "3", reps: "8–12" })
        ]
      },
      {
        slot: "split-squat",
        name: "保加利亚分腿蹲",
        en: "Bulgarian Split Squat",
        role: "辅项",
        badge: "func",
        sets: "3",
        reps: "8–10 / 腿",
        rir: "2",
        rest: "90″",
        primary: ["quads", "glutes", "adductors"],
        secondary: ["hamstrings", "obliques", "hipFlexors"],
        cues: "前脚踩稳，后脚背搭凳；垂直下蹲，前膝跟脚尖同向。先徒手，再加哑铃；身体不要为了起身而前倾太多。",
        why: "单边 + 髋稳定 + 内收肌控制，是蹲日最重要的功能动作；也能暴露左右差异。你的下肢需要更多单边刺激，而不是更多上肢动作。",
        demo: "split-squat",
        alts: [
          alt("walking-lunge", "步行弓步", "Walking Lunge", "split-squat", ["quads", "glutes", "adductors"], ["hamstrings", "obliques", "calves"], "步幅以能垂直下沉为准；前膝跟脚尖同向，后膝轻触地即可。", { sets: "3", reps: "10–12 / 腿" }),
          alt("step-up", "哑铃台阶上步", "Dumbbell Step-Up", "split-squat", ["quads", "glutes", "adductors"], ["hamstrings", "obliques", "calves"], "脚掌完整踩在台上，用前腿发力站起；不要用后腿蹬地。", { sets: "3", reps: "8–10 / 腿" })
        ]
      },
      {
        slot: "leg-extension",
        name: "腿屈伸",
        en: "Leg Extension",
        role: "辅项",
        badge: "aux",
        sets: "2",
        reps: "12–15",
        rir: "1",
        rest: "60″",
        primary: ["quads"],
        secondary: [],
        cues: "膝轴对准器械转轴，顶端停 1 秒；不要用惯性甩。膝痛时减小幅度或换腿举。",
        why: "股四头肌孤立，补深蹲和分腿蹲的容量。它不是腿弯举，不违反你的限制；如果膝盖不舒服，腿举是更稳的替代。",
        demo: "legext",
        alts: [
          alt("leg-press", "腿举", "Leg Press", "legpress", ["quads", "glutes"], ["adductors", "hamstrings", "calves"], "脚掌踩满踏板，膝盖跟脚尖同向；下放到骨盆不卷起的深度，不要锁死膝盖。", { sets: "3", reps: "10–15" })
        ]
      },
      {
        slot: "adductor",
        name: "内收肌器械",
        en: "Hip Adductor Machine",
        role: "辅项",
        badge: "aux",
        sets: "2",
        reps: "12–15",
        rir: "1",
        rest: "60″",
        primary: ["adductors"],
        secondary: ["glutes", "abs"],
        cues: "坐稳，骨盆中立；用大腿内侧夹合，慢回。不要用过大重量，避免腹股沟不适；有疝气或腹股沟疼痛先评估。",
        why: "补内收肌和骨盆稳定；对深蹲、单腿支撑和腹股沟健康有意义，但别把它当性功能特效。真正对性健康证据更扎实的是规律运动、心肺、睡眠、体重和骨盆底肌训练。",
        demo: "adductor",
        alts: [
          alt("copenhagen", "哥本哈根侧桥", "Copenhagen Plank", "copenhagen", ["adductors", "obliques"], ["glutes", "ql", "abs"], "肘在肩下，身体成一条线；上侧腿放在凳上，髋部抬起。先从屈膝、短时间开始。", { sets: "2", reps: "20–30 秒 / 侧" }),
          alt("wide-squat", "宽距深蹲", "Wide-Stance Squat", "squat", ["adductors", "quads", "glutes"], ["erectors", "abs"], "站距略宽，脚尖外展；膝盖跟脚尖同向，下蹲时保持躯干刚性。重量比主项轻。", { sets: "2", reps: "10–12" })
        ]
      },
      {
        slot: "calf",
        name: "站姿提踵",
        en: "Standing Calf Raise",
        role: "辅项",
        badge: "aux",
        sets: "2",
        reps: "10–15",
        rir: "1",
        rest: "45–60″",
        primary: ["calves"],
        secondary: ["hamstrings", "glutes"],
        cues: "脚尖朝前，膝盖微屈固定；顶峰停 1 秒，下放到脚跟低于台阶。不要弹震。",
        why: "小腿在深蹲和硬拉里只是稳定，额外 2 组补量；不占恢复。时间紧时可以砍掉，优先保留内收肌和单边动作。",
        demo: "calf",
        alts: [
          alt("seated-calf", "坐姿提踵", "Seated Calf Raise", "calf", ["calves"], [], "膝盖垫住，脚尖朝前；下放到小腿有拉伸，再提踵。坐姿更偏比目鱼肌。", { sets: "2", reps: "12–15" }),
          alt("legpress-calf", "腿举提踵", "Leg Press Calf Raise", "legpress", ["calves"], ["quads"], "用腿举机前脚掌踩板，膝盖微屈固定；只动踝关节，不要用膝伸代偿。", { sets: "2", reps: "12–15" })
        ]
      },
      {
        slot: "copenhagen",
        name: "哥本哈根侧桥",
        en: "Copenhagen Plank",
        role: "功能",
        badge: "func",
        sets: "2",
        reps: "20–30 秒 / 侧",
        rir: "—",
        rest: "45″",
        primary: ["adductors", "obliques"],
        secondary: ["glutes", "ql", "abs"],
        cues: "肘在肩下，身体成一条线；上侧腿放在凳上，髋部抬起。先从屈膝、短时间开始；腹股沟刺痛就停。",
        why: "内收肌 + 抗侧屈，是蹲日最后的功能补丁；比单纯夹腿更接近运动中的骨盆控制。它也能补单边稳定，和分腿蹲互相呼应。",
        demo: "copenhagen",
        alts: [
          alt("side-plank", "侧桥", "Side Plank", "copenhagen", ["obliques", "ql"], ["glutes", "adductors"], "肘在肩下，髋部抬起；身体成一条线，不要塌腰或转头。", { reps: "30–45 秒 / 侧" }),
          alt("suitcase-carry-squat", "单臂提箱行走", "Suitcase Carry", "carry", ["obliques", "ql"], ["forearm", "traps", "glutes"], "一侧提重，身体不侧倾；肋骨叠在骨盆上，走直线。", { reps: "20–30 m / 侧" })
        ]
      }
    ]
  };

  /* --------------------------------------------------------------------------
     3. Pose helpers and SVG drawing
     -------------------------------------------------------------------------- */
  const NS = "http://www.w3.org/2000/svg";
  const P = (x, y) => [x, y];
  const A = (s, e, h) => [s, e, h];
  const L = (k, a, t) => [k, a, t];
  const F = (head, neck, hip, arm, leg, arm2, leg2) => ({ head, neck, hip, arm, leg, arm2, leg2 });
  const mirrorPts = (pts) => pts.map(([x, y]) => [300 - x, y]);
  const offsetPts = (pts, dx, dy) => pts.map(([x, y]) => [x + dx, y + dy]);

  function normalizePose(pose, view) {
    const out = {
      head: pose.head.slice(),
      neck: pose.neck.slice(),
      hip: pose.hip.slice(),
      arm: pose.arm.map((p) => p.slice()),
      leg: pose.leg.map((p) => p.slice())
    };
    if (pose.arm2) out.arm2 = pose.arm2.map((p) => p.slice());
    else out.arm2 = view === "front" ? mirrorPts(out.arm) : offsetPts(out.arm, -6, 2);
    if (pose.leg2) out.leg2 = pose.leg2.map((p) => p.slice());
    else out.leg2 = view === "front" ? mirrorPts(out.leg) : offsetPts(out.leg, -6, 2);
    return out;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpPts(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]; }
  function lerpPose(a, b, t, view) {
    const pa = normalizePose(a, view);
    const pb = normalizePose(b, view);
    return {
      head: lerpPts(pa.head, pb.head, t),
      neck: lerpPts(pa.neck, pb.neck, t),
      hip: lerpPts(pa.hip, pb.hip, t),
      arm: pa.arm.map((p, i) => lerpPts(p, pb.arm[i], t)),
      arm2: pa.arm2.map((p, i) => lerpPts(p, pb.arm2[i], t)),
      leg: pa.leg.map((p, i) => lerpPts(p, pb.leg[i], t)),
      leg2: pa.leg2.map((p, i) => lerpPts(p, pb.leg2[i], t))
    };
  }

  function svg(tag, attrs) {
    const el = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach((k) => el.setAttribute(k, attrs[k]));
    return el;
  }
  function line(a, b, attrs) {
    const el = svg("line", Object.assign({ x1: a[0], y1: a[1], x2: b[0], y2: b[1] }, attrs || {}));
    return el;
  }
  function circle(c, r, attrs) {
    return svg("circle", Object.assign({ cx: c[0], cy: c[1], r }, attrs || {}));
  }
  function rect(x, y, w, h, attrs) {
    return svg("rect", Object.assign({ x, y, width: w, height: h }, attrs || {}));
  }
  function path(d, attrs) {
    return svg("path", Object.assign({ d }, attrs || {}));
  }
  function add(parent, ...els) { els.forEach((el) => parent.appendChild(el)); return parent; }

  /* --------------------------------------------------------------------------
     4. Demo configs
     Each config has two poses. Coordinate box: 300 × 210 (side) or 300 × 220 (front).
     -------------------------------------------------------------------------- */
  const DEMOS = {
    "bench": {
      view: "side", cycle: 2700,
      poseA: F(P(94, 140), P(110, 145), P(176, 145), A(P(115, 145), P(99, 124), P(112, 111)), L(P(205, 126), P(216, 169), P(227, 169))),
      poseB: F(P(94, 140), P(110, 145), P(176, 145), A(P(115, 145), P(99, 102), P(112, 76)), L(P(205, 126), P(216, 169), P(227, 169))),
      equip: { bench: { x: 78, y: 151, w: 122, h: 7 }, barbell: "hand" },
      path: "hand", note: "肩胛稳定，杠走弧线"
    },
    "machine-press": {
      view: "side", cycle: 2600,
      poseA: F(P(154, 82), P(155, 100), P(160, 155), A(P(155, 104), P(173, 119), P(179, 106)), L(P(190, 148), P(195, 184), P(207, 184))),
      poseB: F(P(154, 82), P(155, 100), P(160, 155), A(P(155, 104), P(173, 91), P(179, 72)), L(P(190, 148), P(195, 184), P(207, 184))),
      equip: { machine: { seat: [146, 160, 58], back: [134, 101, 13, 60], frame: [[128, 188], [128, 78], [200, 78], [200, 188]], handles: [[181, 105], [181, 74]] } },
      path: "hand", note: "把手与肩同高"
    },
    "fly": {
      view: "front", cycle: 2700,
      poseA: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(114, 93), P(100, 104)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(186, 93), P(200, 104)), L(P(162, 165), P(164, 195), P(174, 198))),
      poseB: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(130, 92), P(144, 99)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(170, 92), P(156, 99)), L(P(162, 165), P(164, 195), P(174, 198))),
      equip: { cable: { x: 48, y: 102, x2: 252 } },
      path: "hand", note: "用上臂夹胸，不是推"
    },
    "fly-one": {
      view: "front", cycle: 2800,
      poseA: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(112, 94), P(95, 105)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(172, 98), P(170, 130)), L(P(162, 165), P(164, 195), P(174, 198))),
      poseB: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(128, 93), P(146, 99)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(172, 98), P(170, 130)), L(P(162, 165), P(164, 195), P(174, 198))),
      equip: { cable: { x: 48, y: 104 } },
      path: "hand", note: "单侧，身体不跟着转"
    },
    "lateral": {
      view: "front", cycle: 2500,
      poseA: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(128, 104), P(120, 134)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(172, 104), P(180, 134)), L(P(162, 165), P(164, 195), P(174, 198))),
      poseB: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(111, 72), P(86, 70)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(189, 72), P(214, 70)), L(P(162, 165), P(164, 195), P(174, 198))),
      equip: { dumbbells: true },
      path: "hand", note: "肘带手，不耸肩"
    },
    "overhead-ext": {
      view: "side", cycle: 2600,
      poseA: F(P(140, 48), P(140, 64), P(140, 124), A(P(140, 72), P(156, 55), P(140, 39)), L(P(140, 158), P(140, 188), P(154, 188))),
      poseB: F(P(140, 48), P(140, 64), P(140, 124), A(P(140, 72), P(156, 44), P(172, 24)), L(P(140, 158), P(140, 188), P(154, 188))),
      equip: { cable: { x: 250, y: 35 } },
      path: "hand", note: "肘尖朝前，肋骨内收"
    },
    "cable-crunch": {
      view: "side", cycle: 2600,
      poseA: F(P(144, 92), P(144, 108), P(146, 158), A(P(144, 114), P(160, 96), P(146, 80)), L(P(178, 184), P(198, 190), P(210, 190))),
      poseB: F(P(166, 118), P(160, 130), P(146, 158), A(P(156, 132), P(172, 114), P(160, 98)), L(P(178, 184), P(198, 190), P(210, 190))),
      equip: { cable: { x: 250, y: 35 }, pad: { x: 142, y: 184, w: 86, h: 5, angle: 0 } },
      path: "head", note: "卷胸骨，不是拉头"
    },
    "pallof": {
      view: "side", cycle: 2800,
      poseA: F(P(162, 48), P(162, 64), P(162, 124), A(P(162, 72), P(177, 79), P(170, 94)), L(P(162, 158), P(162, 188), P(176, 188))),
      poseB: F(P(162, 48), P(162, 64), P(162, 124), A(P(162, 72), P(183, 91), P(207, 91)), L(P(162, 158), P(162, 188), P(176, 188))),
      equip: { cable: { x: 42, y: 91 } },
      path: "hand", note: "身体不被拉转"
    },
    "deadlift": {
      view: "side", cycle: 3000,
      poseA: F(P(185, 78), P(175, 92), P(135, 132), A(P(170, 98), P(168, 130), P(170, 160)), L(P(145, 165), P(145, 188), P(158, 188))),
      poseB: F(P(155, 50), P(150, 66), P(150, 124), A(P(150, 74), P(150, 107), P(150, 140)), L(P(150, 160), P(150, 188), P(163, 188))),
      equip: { barbell: "hand" },
      path: "hand", note: "杠贴腿，直线起"
    },
    "pullup": {
      view: "front", cycle: 2700,
      poseA: F(P(150, 76), P(150, 91), P(150, 150), A(P(135, 100), P(128, 66), P(125, 31)), L(P(140, 175), P(140, 199), P(132, 203)), A(P(165, 100), P(172, 66), P(175, 31)), L(P(160, 175), P(160, 199), P(168, 203))),
      poseB: F(P(150, 66), P(150, 81), P(150, 142), A(P(135, 92), P(118, 68), P(125, 31)), L(P(140, 166), P(140, 193), P(132, 197)), A(P(165, 92), P(182, 68), P(175, 31)), L(P(160, 166), P(160, 193), P(168, 197))),
      equip: { bar: { y: 31 } },
      path: "head", note: "沉肩，肘拉向肋骨"
    },
    "row": {
      view: "side", cycle: 2600,
      poseA: F(P(145, 80), P(145, 96), P(165, 155), A(P(145, 103), P(124, 118), P(108, 116)), L(P(190, 148), P(198, 184), P(210, 184))),
      poseB: F(P(145, 80), P(145, 96), P(165, 155), A(P(145, 103), P(160, 112), P(132, 110)), L(P(190, 148), P(198, 184), P(210, 184))),
      equip: { machine: { seat: [170, 160, 44], back: [190, 104, 10, 54], frame: [[117, 188], [117, 92], [226, 92], [226, 188]], handles: [[112, 118]] } },
      path: "hand", note: "胸口贴垫，肘向后"
    },
    "single-row": {
      view: "side", cycle: 2700,
      poseA: F(P(160, 82), P(160, 98), P(170, 152), A(P(160, 105), P(138, 120), P(120, 118)), L(P(194, 148), P(202, 184), P(214, 184))),
      poseB: F(P(160, 82), P(160, 98), P(170, 152), A(P(160, 105), P(176, 114), P(146, 112)), L(P(194, 148), P(202, 184), P(214, 184))),
      equip: { cable: { x: 64, y: 118 } },
      path: "hand", note: "单边拉，躯干不转"
    },
    "reardelt": {
      view: "front", cycle: 2600,
      poseA: F(P(150, 64), P(150, 79), P(150, 140), A(P(135, 89), P(124, 103), P(138, 101)), L(P(138, 174), P(136, 200), P(126, 203)), A(P(165, 89), P(176, 103), P(162, 101)), L(P(162, 174), P(164, 200), P(174, 203))),
      poseB: F(P(150, 64), P(150, 79), P(150, 140), A(P(135, 89), P(112, 92), P(92, 88)), L(P(138, 174), P(136, 200), P(126, 203)), A(P(165, 89), P(188, 92), P(208, 88)), L(P(162, 174), P(164, 200), P(174, 203))),
      equip: { machine: { seat: [128, 154, 44], back: [143, 86, 14, 62], frame: [[112, 202], [112, 70], [188, 70], [188, 202]], handles: [[138, 101], [162, 101]] } },
      path: "hand", note: "肘向外，不耸肩"
    },
    "curl": {
      view: "side", cycle: 2500,
      poseA: F(P(150, 64), P(150, 80), P(162, 140), A(P(150, 89), P(176, 109), P(196, 132)), L(P(186, 145), P(190, 180), P(202, 180))),
      poseB: F(P(150, 64), P(150, 80), P(162, 140), A(P(150, 89), P(176, 109), P(154, 94)), L(P(186, 145), P(190, 180), P(202, 180))),
      equip: { pad: { x: 160, y: 105, w: 46, h: 16, angle: -18 }, barbell: "hand" },
      path: "hand", note: "肘固定在垫上"
    },
    "hanging-knee-raise": {
      view: "front", cycle: 2700,
      poseA: F(P(150, 76), P(150, 91), P(150, 150), A(P(135, 100), P(130, 66), P(128, 31)), L(P(140, 176), P(140, 199), P(132, 203)), A(P(165, 100), P(170, 66), P(172, 31)), L(P(160, 176), P(160, 199), P(168, 203))),
      poseB: F(P(150, 76), P(150, 91), P(150, 150), A(P(135, 100), P(130, 66), P(128, 31)), L(P(128, 146), P(144, 164), P(154, 174)), A(P(165, 100), P(170, 66), P(172, 31)), L(P(172, 146), P(156, 164), P(146, 174))),
      equip: { bar: { y: 31 } },
      path: "knee", note: "先卷骨盆再抬腿"
    },
    "carry": {
      view: "front", cycle: 3200,
      poseA: F(P(147, 42), P(147, 58), P(147, 120), A(P(132, 70), P(125, 104), P(118, 134)), L(P(135, 165), P(132, 195), P(122, 198)), A(P(162, 70), P(169, 104), P(173, 136)), L(P(159, 165), P(162, 195), P(172, 198))),
      poseB: F(P(149, 42), P(149, 58), P(149, 120), A(P(134, 70), P(127, 104), P(120, 134)), L(P(138, 165), P(138, 195), P(128, 198)), A(P(164, 70), P(171, 104), P(175, 136)), L(P(161, 165), P(164, 195), P(174, 198))),
      equip: { dumbbells: true },
      path: "hip", note: "身体不侧倾，走直线"
    },
    "squat": {
      view: "side", cycle: 2800,
      poseA: F(P(150, 48), P(150, 64), P(150, 124), A(P(150, 72), P(166, 89), P(158, 78)), L(P(150, 158), P(150, 188), P(164, 188))),
      poseB: F(P(138, 58), P(138, 74), P(128, 140), A(P(138, 82), P(154, 100), P(146, 88)), L(P(160, 155), P(150, 188), P(164, 188))),
      equip: { barbell: "shoulder" },
      path: "hip", note: "膝盖跟脚尖同向"
    },
    "zercher": {
      view: "side", cycle: 2800,
      poseA: F(P(150, 48), P(150, 64), P(150, 124), A(P(150, 72), P(168, 94), P(182, 86)), L(P(150, 158), P(150, 188), P(164, 188))),
      poseB: F(P(144, 55), P(144, 71), P(134, 140), A(P(144, 80), P(164, 102), P(178, 94)), L(P(164, 155), P(152, 188), P(166, 188))),
      equip: { barbell: "elbow" },
      path: "hip", note: "肘抬高，胸骨向上"
    },
    "rdl": {
      view: "side", cycle: 2900,
      poseA: F(P(150, 48), P(150, 64), P(150, 124), A(P(150, 72), P(150, 104), P(150, 134)), L(P(150, 158), P(150, 188), P(164, 188))),
      poseB: F(P(166, 66), P(160, 82), P(130, 132), A(P(158, 88), P(158, 126), P(158, 164)), L(P(146, 160), P(150, 188), P(164, 188))),
      equip: { barbell: "hand" },
      path: "hand", note: "髋向后，杠贴腿"
    },
    "split-squat": {
      view: "side", cycle: 2800,
      poseA: F(P(145, 48), P(145, 64), P(145, 124), A(P(145, 72), P(152, 102), P(148, 132)), L(P(170, 158), P(170, 188), P(184, 188)), A(P(145, 72), P(138, 102), P(142, 132)), L(P(116, 150), P(104, 166), P(92, 166))),
      poseB: F(P(145, 52), P(145, 68), P(145, 142), A(P(145, 76), P(152, 106), P(148, 136)), L(P(172, 156), P(170, 188), P(184, 188)), A(P(145, 76), P(138, 106), P(142, 136)), L(P(116, 170), P(104, 166), P(92, 166))),
      equip: { bench: { x: 80, y: 165, w: 44, h: 22 }, dumbbells: true },
      path: "hip", note: "前膝跟脚尖同向"
    },
    "legext": {
      view: "side", cycle: 2600,
      poseA: F(P(142, 78), P(142, 94), P(160, 152), A(P(142, 100), P(154, 120), P(165, 124)), L(P(188, 150), P(212, 172), P(224, 172))),
      poseB: F(P(142, 78), P(142, 94), P(160, 152), A(P(142, 100), P(154, 120), P(165, 124)), L(P(190, 148), P(226, 139), P(238, 139))),
      equip: { machine: { seat: [148, 158, 42], back: [132, 98, 10, 54], frame: [[126, 190], [126, 84], [236, 84], [236, 190]], handles: [[170, 126]] } },
      path: "ankle", note: "膝轴对准转轴"
    },
    "adductor": {
      view: "front", cycle: 2600,
      poseA: F(P(150, 60), P(150, 75), P(150, 136), A(P(135, 84), P(128, 110), P(120, 138)), L(P(116, 150), P(106, 180), P(96, 184)), A(P(165, 84), P(172, 110), P(180, 138)), L(P(184, 150), P(194, 180), P(204, 184))),
      poseB: F(P(150, 60), P(150, 75), P(150, 136), A(P(135, 84), P(128, 110), P(120, 138)), L(P(136, 150), P(130, 180), P(122, 184)), A(P(165, 84), P(172, 110), P(180, 138)), L(P(164, 150), P(170, 180), P(178, 184))),
      equip: { machine: { seat: [122, 152, 56], back: [143, 78, 14, 64], frame: [[116, 202], [116, 68], [184, 68], [184, 202]], handles: [[122, 142], [178, 142]] } },
      path: "knee", note: "用大腿内侧夹合"
    },
    "calf": {
      view: "side", cycle: 2300,
      poseA: F(P(150, 44), P(150, 60), P(150, 118), A(P(150, 68), P(150, 100), P(150, 130)), L(P(150, 152), P(150, 182), P(166, 186))),
      poseB: F(P(150, 39), P(150, 55), P(150, 113), A(P(150, 63), P(150, 95), P(150, 125)), L(P(150, 147), P(150, 172), P(166, 186))),
      equip: { step: { x: 138, y: 184, w: 46, h: 14 } },
      path: "hip", note: "顶峰停 1 秒"
    },
    "copenhagen": {
      view: "side", cycle: 3400,
      poseA: F(P(106, 110), P(118, 118), P(170, 144), A(P(118, 126), P(100, 148), P(90, 152)), L(P(190, 166), P(204, 178), P(214, 178)), A(P(118, 126), P(142, 132), P(154, 136)), L(P(194, 132), P(216, 126), P(228, 126))),
      poseB: F(P(106, 107), P(118, 115), P(170, 140), A(P(118, 123), P(100, 145), P(90, 149)), L(P(190, 163), P(204, 175), P(214, 175)), A(P(118, 123), P(142, 129), P(154, 133)), L(P(194, 129), P(216, 123), P(228, 123))),
      equip: { bench: { x: 186, y: 124, w: 54, h: 12 } },
      path: "hip", note: "髋抬起，身体一条线"
    },
    "hip-thrust": {
      view: "side", cycle: 2700,
      poseA: F(P(98, 120), P(112, 125), P(170, 164), A(P(116, 128), P(130, 150), P(144, 156)), L(P(208, 148), P(218, 184), P(230, 184))),
      poseB: F(P(100, 112), P(114, 118), P(170, 136), A(P(118, 122), P(132, 144), P(146, 150)), L(P(208, 142), P(218, 184), P(230, 184))),
      equip: { bench: { x: 68, y: 126, w: 68, h: 8 }, barbell: "hip" },
      path: "hip", note: "顶峰收臀，不后仰"
    },
    "legpress": {
      view: "side", cycle: 2600,
      poseA: F(P(128, 88), P(128, 104), P(160, 154), A(P(128, 110), P(142, 128), P(152, 132)), L(P(190, 140), P(210, 160), P(222, 160))),
      poseB: F(P(128, 88), P(128, 104), P(160, 154), A(P(128, 110), P(142, 128), P(152, 132)), L(P(200, 132), P(232, 140), P(244, 140))),
      equip: { machine: { seat: [146, 160, 44], back: [124, 100, 12, 60], frame: [[118, 192], [118, 88], [246, 88], [246, 192]], handles: [[160, 134]] } },
      path: "ankle", note: "膝盖跟脚尖同向"
    },
    "facepull": {
      view: "front", cycle: 2600,
      poseA: F(P(150, 54), P(150, 69), P(150, 130), A(P(135, 78), P(120, 86), P(136, 72)), L(P(138, 170), P(136, 198), P(126, 201)), A(P(165, 78), P(180, 86), P(164, 72)), L(P(162, 170), P(164, 198), P(174, 201))),
      poseB: F(P(150, 54), P(150, 69), P(150, 130), A(P(135, 78), P(120, 82), P(104, 84)), L(P(138, 170), P(136, 198), P(126, 201)), A(P(165, 78), P(180, 82), P(196, 84)), L(P(162, 170), P(164, 198), P(174, 201))),
      equip: { cable: { x: 150, y: 24, x2: 150 } },
      path: "hand", note: "拉向眉心，肘向外"
    },
    "pushdown": {
      view: "side", cycle: 2500,
      poseA: F(P(150, 48), P(150, 64), P(150, 124), A(P(150, 72), P(166, 94), P(178, 84)), L(P(150, 158), P(150, 188), P(164, 188))),
      poseB: F(P(150, 48), P(150, 64), P(150, 124), A(P(150, 72), P(166, 94), P(178, 128)), L(P(150, 158), P(150, 188), P(164, 188))),
      equip: { cable: { x: 246, y: 35 } },
      path: "hand", note: "肘固定在身侧"
    },
    "dip": {
      view: "side", cycle: 2700,
      poseA: F(P(150, 58), P(150, 74), P(150, 138), A(P(150, 82), P(150, 104), P(150, 126)), L(P(178, 154), P(190, 172), P(202, 172))),
      poseB: F(P(150, 72), P(150, 88), P(150, 150), A(P(150, 96), P(136, 110), P(150, 126)), L(P(178, 164), P(190, 180), P(202, 180))),
      equip: { bar: { y: 126, short: true } },
      path: "hip", note: "肘向后，不耸肩"
    },
    "pulldown": {
      view: "front", cycle: 2600,
      poseA: F(P(150, 70), P(150, 85), P(150, 145), A(P(135, 94), P(128, 66), P(120, 38)), L(P(140, 170), P(140, 198), P(132, 202)), A(P(165, 94), P(172, 66), P(180, 38)), L(P(160, 170), P(160, 198), P(168, 202))),
      poseB: F(P(150, 66), P(150, 81), P(150, 139), A(P(135, 90), P(112, 86), P(130, 68)), L(P(140, 164), P(140, 194), P(132, 198)), A(P(165, 90), P(188, 86), P(170, 68)), L(P(160, 164), P(160, 194), P(168, 198))),
      equip: { cable: { x: 150, y: 26, x2: 150 } },
      path: "hand", note: "先沉肩，再拉肘"
    },
    "barbell-row": {
      view: "side", cycle: 2600,
      poseA: F(P(185, 86), P(175, 100), P(135, 140), A(P(170, 106), P(168, 134), P(170, 158)), L(P(145, 170), P(145, 188), P(158, 188))),
      poseB: F(P(185, 86), P(175, 100), P(135, 140), A(P(170, 106), P(188, 126), P(174, 138)), L(P(145, 170), P(145, 188), P(158, 188))),
      equip: { barbell: "hand" },
      path: "hand", note: "躯干角度固定，不甩"
    },
    "hammer-curl": {
      view: "front", cycle: 2500,
      poseA: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(132, 104), P(130, 134)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(168, 104), P(170, 134)), L(P(162, 165), P(164, 195), P(174, 198))),
      poseB: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(132, 104), P(142, 88)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(168, 104), P(158, 88)), L(P(162, 165), P(164, 195), P(174, 198))),
      equip: { dumbbells: true },
      path: "hand", note: "拇指朝上，肘固定"
    },
    "incline-curl": {
      view: "side", cycle: 2500,
      poseA: F(P(138, 78), P(138, 94), P(168, 148), A(P(138, 100), P(145, 132), P(148, 160)), L(P(190, 144), P(196, 180), P(208, 180))),
      poseB: F(P(138, 78), P(138, 94), P(168, 148), A(P(138, 100), P(145, 132), P(160, 118)), L(P(190, 144), P(196, 180), P(208, 180))),
      equip: { pad: { x: 120, y: 92, w: 18, h: 60, angle: 32 }, dumbbells: true },
      path: "hand", note: "肩打开，长头拉伸"
    },
    "reverse-curl": {
      view: "front", cycle: 2500,
      poseA: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(132, 104), P(130, 134)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(168, 104), P(170, 134)), L(P(162, 165), P(164, 195), P(174, 198))),
      poseB: F(P(150, 42), P(150, 58), P(150, 120), A(P(135, 70), P(132, 104), P(144, 96)), L(P(138, 165), P(136, 195), P(126, 198)), A(P(165, 70), P(168, 104), P(156, 96)), L(P(162, 165), P(164, 195), P(174, 198))),
      equip: { barbell: "hands" },
      path: "hand", note: "掌心向下，手腕中立"
    },
    "reverse-crunch": {
      view: "side", cycle: 2600,
      poseA: F(P(94, 148), P(110, 150), P(170, 150), A(P(112, 150), P(122, 128), P(132, 116)), L(P(190, 126), P(204, 132), P(216, 132))),
      poseB: F(P(94, 148), P(110, 150), P(164, 142), A(P(112, 150), P(122, 128), P(132, 116)), L(P(180, 118), P(194, 126), P(206, 126))),
      equip: { mat: true },
      path: "knee", note: "骨盆后倾，不是甩腿"
    }
  };

  /* --------------------------------------------------------------------------
     5. Demo renderer
     -------------------------------------------------------------------------- */
  const allDemos = new Set();
  let demoObserver = null;
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function ensureObserver() {
    if (demoObserver || !("IntersectionObserver" in window)) return;
    demoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const demo = entry.target.__demo;
        if (demo) demo.visible = entry.isIntersecting;
      });
    }, { rootMargin: "120px 0px" });
  }

  function limb(svgRoot, pts, className, width, opacity) {
    const g = svg("g", { class: className, opacity: opacity == null ? 1 : opacity });
    add(g,
      line(pts[0], pts[1], { stroke: "currentColor", "stroke-width": width, "stroke-linecap": "round" }),
      line(pts[1], pts[2], { stroke: "currentColor", "stroke-width": width - 0.6, "stroke-linecap": "round" })
    );
    return g;
  }

  function jointDots(svgRoot, pose, color, opacity) {
    const pts = [pose.arm[0], pose.arm[1], pose.leg[0], pose.leg[1], pose.arm2[0], pose.arm2[1], pose.leg2[0], pose.leg2[1]];
    pts.forEach((p) => {
      svgRoot.appendChild(circle(p, 2.2, { fill: color, opacity: opacity == null ? 0.9 : opacity }));
    });
  }

  function drawFigure(svgRoot, pose, view) {
    const nearArm = limb(svgRoot, pose.arm, "arm near", 7, 1);
    nearArm.setAttribute("color", "#e8eef3");
    const farArm = limb(svgRoot, pose.arm2, "arm far", 5.4, view === "front" ? 0.58 : 0.34);
    farArm.setAttribute("color", "#93a1ae");
    const nearLeg = limb(svgRoot, [pose.hip, pose.leg[0], pose.leg[1]], "leg near", 8, 1);
    nearLeg.setAttribute("color", "#e8eef3");
    const farLeg = limb(svgRoot, [pose.hip, pose.leg2[0], pose.leg2[1]], "leg far", 6, view === "front" ? 0.58 : 0.34);
    farLeg.setAttribute("color", "#93a1ae");

    // feet / hands
    add(svgRoot,
      line(pose.leg[1], pose.leg[2], { stroke: "#e8eef3", "stroke-width": 5.5, "stroke-linecap": "round" }),
      line(pose.leg2[1], pose.leg2[2], { stroke: "#93a1ae", "stroke-width": 4, "stroke-linecap": "round", opacity: view === "front" ? 0.58 : 0.34 }),
      circle(pose.arm[2], 3.1, { fill: "#e8eef3" }),
      circle(pose.arm2[2], 2.8, { fill: "#93a1ae", opacity: view === "front" ? 0.58 : 0.34 })
    );

    // torso
    const midX = (pose.neck[0] + pose.hip[0]) / 2;
    const midY = (pose.neck[1] + pose.hip[1]) / 2;
    const bend = view === "side" ? 4 : 0;
    svgRoot.appendChild(path(
      `M ${pose.neck[0]} ${pose.neck[1]} Q ${midX + bend} ${midY} ${pose.hip[0]} ${pose.hip[1]}`,
      { fill: "none", stroke: "#e8eef3", "stroke-width": 14, "stroke-linecap": "round" }
    ));
    svgRoot.appendChild(path(
      `M ${pose.neck[0]} ${pose.neck[1]} Q ${midX + bend} ${midY} ${pose.hip[0]} ${pose.hip[1]}`,
      { fill: "none", stroke: "#b7c3ce", "stroke-width": 2, "stroke-linecap": "round", opacity: 0.35 }
    ));

    // shoulder / hip bridge
    if (view === "front") {
      add(svgRoot,
        line(pose.arm[0], pose.arm2[0], { stroke: "#e8eef3", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.65 }),
        line(pose.leg[0], pose.leg2[0], { stroke: "#e8eef3", "stroke-width": 5, "stroke-linecap": "round", opacity: 0.35 })
      );
    }

    // head
    svgRoot.appendChild(circle(pose.head, 10, { fill: "#eef3f6", stroke: "#0b1016", "stroke-width": 1.5 }));
    const faceDir = view === "front" ? 0 : 1;
    if (view === "side") {
      const dir = pose.arm[2][0] > pose.head[0] ? 1 : -1;
      svgRoot.appendChild(line([pose.head[0] + dir * 5, pose.head[1] - 1], [pose.head[0] + dir * 9, pose.head[1] - 1], { stroke: "#8b98a5", "stroke-width": 1.4, "stroke-linecap": "round", opacity: 0.7 }));
    } else {
      svgRoot.appendChild(line([pose.head[0] - 4, pose.head[1] + 1], [pose.head[0] + 4, pose.head[1] + 1], { stroke: "#8b98a5", "stroke-width": 1.2, "stroke-linecap": "round", opacity: 0.45 }));
    }

    jointDots(svgRoot, pose, "#c9f56a", 0.9);

    // re-add far limbs above torso? no — draw far limbs behind torso.
    // Move far limbs before torso.
    svgRoot.insertBefore(farArm, svgRoot.querySelector("path"));
    svgRoot.insertBefore(farLeg, svgRoot.querySelector("path"));
  }

  function drawBench(svgRoot, cfg) {
    const b = cfg.equip && cfg.equip.bench;
    if (!b) return;
    const g = svg("g", { opacity: 0.88 });
    add(g,
      rect(b.x, b.y, b.w, b.h || 7, { rx: 3, fill: "#2a3540", stroke: "#7d8b98", "stroke-width": 0.6 }),
      line([b.x + 10, b.y + (b.h || 7)], [b.x + 10, b.y + (b.h || 7) + 22], { stroke: "#5c6a77", "stroke-width": 2.5 }),
      line([b.x + b.w - 12, b.y + (b.h || 7)], [b.x + b.w - 12, b.y + (b.h || 7) + 22], { stroke: "#5c6a77", "stroke-width": 2.5 })
    );
    svgRoot.appendChild(g);
  }

  function drawMachine(svgRoot, cfg) {
    const m = cfg.equip && cfg.equip.machine;
    if (!m) return;
    const g = svg("g", { opacity: 0.9 });
    if (m.frame) {
      m.frame.forEach((p) => {
        g.appendChild(circle(p, 2.4, { fill: "#657381" }));
      });
      const pts = m.frame;
      for (let i = 0; i < pts.length - 1; i += 1) {
        g.appendChild(line(pts[i], pts[i + 1], { stroke: "#556371", "stroke-width": 2.2, opacity: 0.7 }));
      }
    }
    if (m.back) {
      g.appendChild(rect(m.back[0], m.back[1], m.back[2], m.back[3], { rx: 4, fill: "#202b35", stroke: "#5d6b78", "stroke-width": 0.7 }));
    }
    if (m.seat) {
      g.appendChild(rect(m.seat[0], m.seat[1], m.seat[2], 7, { rx: 3, fill: "#2a3540", stroke: "#6b7986", "stroke-width": 0.7 }));
      g.appendChild(line([m.seat[0] + 8, m.seat[1] + 7], [m.seat[0] + 8, 190], { stroke: "#4f5d6a", "stroke-width": 2.2, opacity: 0.7 }));
      g.appendChild(line([m.seat[0] + m.seat[2] - 8, m.seat[1] + 7], [m.seat[0] + m.seat[2] - 8, 190], { stroke: "#4f5d6a", "stroke-width": 2.2, opacity: 0.7 }));
    }
    if (m.handles) {
      m.handles.forEach((h) => {
        g.appendChild(circle(h, 3.2, { fill: "#c9f56a", opacity: 0.85 }));
        g.appendChild(line([h[0] - 7, h[1]], [h[0] + 7, h[1]], { stroke: "#c9f56a", "stroke-width": 2.2, "stroke-linecap": "round", opacity: 0.75 }));
      });
    }
    svgRoot.appendChild(g);
  }

  function drawCable(svgRoot, cfg, pose, layer) {
    const c = cfg.equip && cfg.equip.cable;
    if (!c) return;
    if (layer === "back") {
      const g = svg("g", { opacity: 0.8 });
      const columns = [c.x];
      if (c.x2 != null) columns.push(c.x2);
      columns.forEach((x) => {
        g.appendChild(line([x, c.y], [x, 190], { stroke: "#4c5a67", "stroke-width": 3 }));
        g.appendChild(circle([x, c.y], 4.2, { fill: "none", stroke: "#8b99a6", "stroke-width": 1.6 }));
        g.appendChild(circle([x, c.y], 1.4, { fill: "#c9f56a" }));
      });
      if (c.x2 == null) {
        g.appendChild(line([c.x, c.y], [c.x, c.y + 12], { stroke: "#4c5a67", "stroke-width": 1.2 }));
      }
      svgRoot.appendChild(g);
    } else {
      const g = svg("g", { opacity: 0.92 });
      const targets = [];
      if (c.x2 != null) {
        targets.push(pose.arm[2], pose.arm2[2]);
      } else {
        targets.push(pose.arm[2]);
      }
      targets.forEach((target) => {
        const startX = c.x2 != null ? (target[0] < 150 ? Math.min(c.x, c.x2) : Math.max(c.x, c.x2)) : c.x;
        const start = [startX, c.y];
        g.appendChild(line(start, target, { stroke: "#aab7c3", "stroke-width": 1.4, "stroke-linecap": "round", opacity: 0.8 }));
      });
      svgRoot.appendChild(g);
    }
  }

  function drawBar(svgRoot, cfg) {
    const b = cfg.equip && cfg.equip.bar;
    if (!b) return;
    const g = svg("g", { opacity: 0.9 });
    const x1 = b.short ? 100 : 48;
    const x2 = b.short ? 200 : 252;
    g.appendChild(line([x1, b.y], [x2, b.y], { stroke: "#8b99a6", "stroke-width": 4, "stroke-linecap": "round" }));
    if (!b.short) {
      g.appendChild(line([x1, b.y - 20], [x1, 190], { stroke: "#4f5d6a", "stroke-width": 3 }));
      g.appendChild(line([x2, b.y - 20], [x2, 190], { stroke: "#4f5d6a", "stroke-width": 3 }));
    }
    svgRoot.appendChild(g);
  }

  function drawDumbbells(svgRoot, pose, view) {
    const g = svg("g", { opacity: 0.95 });
    const hands = [pose.arm[2], pose.arm2[2]];
    hands.forEach((h, i) => {
      const dir = i === 0 ? -1 : 1;
      const len = 7;
      g.appendChild(line([h[0] - len, h[1]], [h[0] + len, h[1]], { stroke: "#c9f56a", "stroke-width": 2.6, "stroke-linecap": "round" }));
      g.appendChild(circle([h[0] - len, h[1]], 2.2, { fill: "#c9f56a" }));
      g.appendChild(circle([h[0] + len, h[1]], 2.2, { fill: "#c9f56a" }));
    });
    svgRoot.appendChild(g);
  }

  function drawBarbell(svgRoot, cfg, pose, view) {
    const b = cfg.equip && cfg.equip.barbell;
    if (!b) return;
    const g = svg("g", { opacity: 0.98 });
    const plate = (c, r) => {
      g.appendChild(circle(c, r || 10, { fill: "#111821", stroke: "#c9f56a", "stroke-width": 2.4 }));
      g.appendChild(circle(c, (r || 10) * 0.32, { fill: "#c9f56a", opacity: 0.9 }));
    };
    if (b === "hands") {
      const a = pose.arm[2], c = pose.arm2[2];
      g.appendChild(line(a, c, { stroke: "#aab7c3", "stroke-width": 3.2, "stroke-linecap": "round" }));
      plate(a, 8); plate(c, 8);
    } else if (b === "shoulder") {
      const s = pose.arm[0];
      plate([s[0] - 7, s[1] - 1], 10);
      g.appendChild(line([s[0] - 7, s[1] - 1], [s[0] + 35, s[1] - 1], { stroke: "#aab7c3", "stroke-width": 3.2, "stroke-linecap": "round", opacity: 0.55 }));
    } else if (b === "elbow") {
      const e = pose.arm[1];
      plate(e, 9);
      g.appendChild(line([e[0], e[1]], [e[0] + 26, e[1] + 3], { stroke: "#aab7c3", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.5 }));
    } else if (b === "hip") {
      plate(pose.hip, 10);
      g.appendChild(line([pose.hip[0] - 26, pose.hip[1]], [pose.hip[0] + 26, pose.hip[1]], { stroke: "#aab7c3", "stroke-width": 3.2, "stroke-linecap": "round", opacity: 0.55 }));
    } else {
      plate(pose.arm[2], 10);
      g.appendChild(line([pose.arm[2][0] - 26, pose.arm[2][1]], [pose.arm[2][0] + 26, pose.arm[2][1]], { stroke: "#aab7c3", "stroke-width": 3, "stroke-linecap": "round", opacity: 0.45 }));
    }
    svgRoot.appendChild(g);
  }

  function drawPad(svgRoot, cfg) {
    const p = cfg.equip && cfg.equip.pad;
    if (!p) return;
    const g = svg("g", { opacity: 0.86 });
    g.appendChild(rect(p.x, p.y, p.w, p.h, { rx: 4, fill: "#222d37", stroke: "#687684", "stroke-width": 0.7, transform: `rotate(${p.angle || 0} ${p.x + p.w / 2} ${p.y + p.h / 2})` }));
    svgRoot.appendChild(g);
  }

  function drawStep(svgRoot, cfg) {
    const s = cfg.equip && cfg.equip.step;
    if (!s) return;
    const g = svg("g", { opacity: 0.85 });
    g.appendChild(rect(s.x, s.y, s.w, s.h, { rx: 2, fill: "#25313c", stroke: "#6b7986", "stroke-width": 0.7 }));
    svgRoot.appendChild(g);
  }

  function drawMat(svgRoot) {
    const g = svg("g", { opacity: 0.65 });
    g.appendChild(rect(72, 164, 172, 5, { rx: 2, fill: "#2c3944" }));
    svgRoot.appendChild(g);
  }

  function drawSled(svgRoot, cfg) {
    const s = cfg.equip && cfg.equip.sled;
    if (!s) return;
    const g = svg("g", { opacity: 0.8 });
    g.appendChild(rect(s.x, s.y, 24, 52, { rx: 3, fill: "#25313c", stroke: "#6b7986", "stroke-width": 0.7, transform: `rotate(-18 ${s.x} ${s.y})` }));
    svgRoot.appendChild(g);
  }

  function drawFloor(svgRoot, cfg) {
    svgRoot.appendChild(line([24, 196], [276, 196], { stroke: "#3d4a56", "stroke-width": 1.2, "stroke-linecap": "round", opacity: 0.7 }));
    for (let x = 36; x < 276; x += 24) {
      svgRoot.appendChild(line([x, 196], [x + 8, 196], { stroke: "#8b99a6", "stroke-width": 1, opacity: 0.3 }));
    }
  }

  function drawPath(svgRoot, cfg) {
    if (!cfg.path || !cfg.poseA || !cfg.poseB) return;
    const get = (pose, key) => {
      if (key === "hand") return pose.arm[2];
      if (key === "head") return pose.head;
      if (key === "hip") return pose.hip;
      if (key === "knee") return pose.leg[0];
      if (key === "ankle") return pose.leg[1];
      return pose.arm[2];
    };
    const a = get(cfg.poseA, cfg.path);
    const b = get(cfg.poseB, cfg.path);
    if (Math.abs(a[0] - b[0]) < 3 && Math.abs(a[1] - b[1]) < 3) return;
    const mx = (a[0] + b[0]) / 2;
    const my = (a[1] + b[1]) / 2;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.max(1, Math.hypot(dx, dy));
    const nx = -dy / len, ny = dx / len;
    const curve = Math.min(16, len * 0.16);
    const d = `M ${a[0]} ${a[1]} Q ${mx + nx * curve} ${my + ny * curve} ${b[0]} ${b[1]}`;
    const g = svg("g", { opacity: 0.38 });
    g.appendChild(path(d, { fill: "none", stroke: "#c9f56a", "stroke-width": 1.2, "stroke-dasharray": "3 4", "stroke-linecap": "round" }));
    g.appendChild(circle(a, 2.2, { fill: "#c9f56a", opacity: 0.7 }));
    g.appendChild(circle(b, 2.2, { fill: "#c9f56a", opacity: 0.7 }));
    svgRoot.appendChild(g);
  }

  function demoViewBox(cfg) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const add = (x, y) => {
      if (!Number.isFinite(x) || !Number.isFinite(y)) return;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    };
    const addPose = (raw) => {
      const p = normalizePose(raw, cfg.view);
      add(p.head[0] - 13, p.head[1] - 13);
      add(p.head[0] + 13, p.head[1] + 13);
      add(p.hip[0] - 8, p.hip[1] - 8);
      add(p.hip[0] + 8, p.hip[1] + 8);
      [p.arm, p.arm2].forEach((arm) => arm.forEach(([x, y]) => add(x, y)));
      [p.leg, p.leg2].forEach((leg) => leg.forEach(([x, y]) => add(x, y)));
    };
    addPose(cfg.poseA);
    addPose(cfg.poseB);

    const e = cfg.equip || {};
    if (e.bench) {
      add(e.bench.x, e.bench.y);
      add(e.bench.x + e.bench.w, e.bench.y + (e.bench.h || 7) + 24);
    }
    if (e.machine) {
      if (e.machine.frame) e.machine.frame.forEach(([x, y]) => add(x, y));
      if (e.machine.back) {
        add(e.machine.back[0], e.machine.back[1]);
        add(e.machine.back[0] + e.machine.back[2], e.machine.back[1] + e.machine.back[3]);
      }
      if (e.machine.seat) {
        add(e.machine.seat[0], e.machine.seat[1]);
        add(e.machine.seat[0] + e.machine.seat[2], e.machine.seat[1] + 24);
      }
      if (e.machine.handles) e.machine.handles.forEach(([x, y]) => { add(x - 8, y - 8); add(x + 8, y + 8); });
    }
    if (e.cable) {
      add(e.cable.x - 8, e.cable.y - 10);
      add(e.cable.x + 8, 196);
      if (e.cable.x2 != null) {
        add(e.cable.x2 - 8, e.cable.y - 10);
        add(e.cable.x2 + 8, 196);
      }
    }
    if (e.bar) {
      const x1 = e.bar.short ? 100 : 48;
      const x2 = e.bar.short ? 200 : 252;
      add(x1, e.bar.y - 24);
      add(x2, 196);
    }
    if (e.step) { add(e.step.x, e.step.y); add(e.step.x + e.step.w, e.step.y + e.step.h); }
    if (e.pad) { add(e.pad.x, e.pad.y); add(e.pad.x + e.pad.w, e.pad.y + e.pad.h); }
    if (e.mat) { add(72, 164); add(244, 169); }
    if (e.sled) { add(e.sled.x, e.sled.y); add(e.sled.x + 30, e.sled.y + 56); }
    if (e.barbell) {
      const pts = [];
      const pa = normalizePose(cfg.poseA, cfg.view);
      const pb = normalizePose(cfg.poseB, cfg.view);
      if (e.barbell === "hands") { pts.push(pa.arm[2], pa.arm2[2], pb.arm[2], pb.arm2[2]); }
      else if (e.barbell === "shoulder") { pts.push(pa.arm[0], pb.arm[0]); }
      else if (e.barbell === "elbow") { pts.push(pa.arm[1], pb.arm[1]); }
      else if (e.barbell === "hip") { pts.push(pa.hip, pb.hip); }
      else { pts.push(pa.arm[2], pb.arm[2]); }
      pts.forEach(([x, y]) => { add(x - 14, y - 14); add(x + 14, y + 14); });
    }
    if (e.dumbbells) {
      [cfg.poseA, cfg.poseB].forEach((p) => {
        const n = normalizePose(p, cfg.view);
        [n.arm[2], n.arm2[2]].forEach(([x, y]) => { add(x - 11, y - 8); add(x + 11, y + 8); });
      });
    }
    maxY = Math.max(maxY, 196);

    let w = maxX - minX, h = maxY - minY;
    const pad = Math.max(9, Math.min(w, h) * 0.14);
    minX -= pad; maxX += pad; minY -= pad; maxY += pad;
    w = maxX - minX; h = maxY - minY;
    const target = 1.08;
    if (w / h < target) {
      const extra = (h * target - w) / 2;
      minX -= extra; maxX += extra;
    }
    if (h < 132) {
      const extra = (132 - h) / 2;
      minY -= extra; maxY += extra;
    }
    if (w < 132) {
      const extra = (132 - w) / 2;
      minX -= extra; maxX += extra;
    }
    return `${minX.toFixed(1)} ${minY.toFixed(1)} ${(maxX - minX).toFixed(1)} ${(maxY - minY).toFixed(1)}`;
  }

  class ExerciseDemo {
    constructor(host, type) {
      this.host = host;
      this.type = type;
      this.cfg = DEMOS[type] || DEMOS.bench;
      this.visible = false;
      this.svgRoot = null;
      this.build();
      allDemos.add(this);
      ensureObserver();
      if (demoObserver) demoObserver.observe(host);
      else this.visible = true;
      host.__demo = this;
    }

    build() {
      const cfg = this.cfg;
      this.host.innerHTML = "";
      const root = svg("svg", {
        viewBox: demoViewBox(cfg),
        role: "img",
        "aria-label": cfg.note || "动作循环演示",
        preserveAspectRatio: "xMidYMid meet"
      });
      root.style.color = "#e8eef3";
      if (cfg.equip && cfg.equip.bench) drawBench(root, cfg);
      if (cfg.equip && cfg.equip.machine) drawMachine(root, cfg);
      if (cfg.equip && cfg.equip.cable) drawCable(root, cfg, normalizePose(cfg.poseA, cfg.view), "back");
      if (cfg.equip && cfg.equip.bar) drawBar(root, cfg);
      if (cfg.equip && cfg.equip.step) drawStep(root, cfg);
      if (cfg.equip && cfg.equip.pad) drawPad(root, cfg);
      if (cfg.equip && cfg.equip.mat) drawMat(root);
      if (cfg.equip && cfg.equip.sled) drawSled(root, cfg);
      drawPath(root, cfg);
      drawFloor(root, cfg);

      this.figureLayer = svg("g", { class: "figure-layer" });
      root.appendChild(this.figureLayer);
      this.equipmentFront = svg("g", { class: "equipment-front" });
      root.appendChild(this.equipmentFront);
      this.host.appendChild(root);
      this.svgRoot = root;
      this.render(reduceMotion ? 0.55 : 0.08);
    }

    render(t) {
      const cfg = this.cfg;
      const phase = reduceMotion ? 0.55 : (1 - Math.cos(t * Math.PI * 2)) / 2;
      const pose = lerpPose(cfg.poseA, cfg.poseB, phase, cfg.view);
      this.figureLayer.innerHTML = "";
      this.equipmentFront.innerHTML = "";
      drawFigure(this.figureLayer, pose, cfg.view);
      if (cfg.equip) {
        if (cfg.equip.barbell) drawBarbell(this.equipmentFront, cfg, pose, cfg.view);
        if (cfg.equip.dumbbells) drawDumbbells(this.equipmentFront, pose, cfg.view);
        if (cfg.equip.cable) drawCable(this.equipmentFront, cfg, pose, "front");
      }
    }

    destroy() {
      allDemos.delete(this);
      if (demoObserver) demoObserver.unobserve(this.host);
      this.host.innerHTML = "";
    }
  }

  let demoStart = performance.now();
  function tick(now) {
    const elapsed = now - demoStart;
    allDemos.forEach((demo) => {
      if (!demo.visible) return;
      const cycle = demo.cfg.cycle || 2600;
      demo.render((elapsed % cycle) / cycle);
    });
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  /* --------------------------------------------------------------------------
     6. Body map
     -------------------------------------------------------------------------- */
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

  function renderBodyMaps() {
    document.querySelectorAll("[data-body-map]").forEach((el) => { el.innerHTML = BODY_MAP; });
  }

  /* --------------------------------------------------------------------------
     7. UI state, rendering, interactions
     -------------------------------------------------------------------------- */
  const STORAGE_KEY = "ppl60-state-v1";
  let state = { push: {}, pull: {}, squat: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") state = Object.assign(state, parsed);
    }
  } catch (err) { /* ignore */ }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (err) { /* ignore */ }
  }

  function getSlotState(day, slot) {
    if (!state[day] || typeof state[day] !== "object") state[day] = {};
    if (!state[day][slot] || typeof state[day][slot] !== "object") state[day][slot] = { alt: "default", done: false };
    return state[day][slot];
  }

  function resolveExercise(day, slotId) {
    const base = EXERCISES[day].find((ex) => ex.slot === slotId);
    const st = getSlotState(day, slotId);
    if (!base || !st.alt || st.alt === "default") return { base, ex: base, st };
    const choice = (base.alts || []).find((a) => a.id === st.alt);
    if (!choice) return { base, ex: base, st };
    const merged = Object.assign({}, base, choice, { slot: base.slot, baseName: base.name });
    return { base, ex: merged, st };
  }

  function muscleChips(ex) {
    const primary = ex.primary.map((id) => MUSCLES[id] ? MUSCLES[id].label : id);
    const secondary = ex.secondary.map((id) => MUSCLES[id] ? MUSCLES[id].label : id);
    return primary.map((label) => `<span class="muscle-chip">${label}</span>`).join("") +
      secondary.map((label) => `<span class="muscle-chip secondary">${label}</span>`).join("");
  }

  function optionsHTML(base, st) {
    if (!base.alts || !base.alts.length) {
      return `<div class="alt-fixed">${base.fixed || "固定动作"}</div>`;
    }
    const opts = [`<option value="default"${st.alt === "default" ? " selected" : ""}>默认 · ${base.name}</option>`]
      .concat(base.alts.map((a) => `<option value="${a.id}"${st.alt === a.id ? " selected" : ""}>${a.name}</option>`));
    return `<select class="alt-select" data-alt-select="${base.slot}" aria-label="替换 ${base.name}">${opts.join("")}</select>`;
  }

  function cardHTML(day, ex, base, st, index) {
    const isDone = !!st.done;
    return `
      <article class="exercise-card${isDone ? " is-done" : ""}" data-slot="${base.slot}" data-day="${day}" tabindex="0" aria-label="${ex.name}">
        <div class="ex-top">
          <span class="ex-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="ex-title">
            <h3>${ex.name}<span>${ex.en}</span></h3>
            <div class="ex-badges">
              <span class="badge ${ex.badge}">${ex.role}</span>
              ${base.alts && base.alts.length ? `<span class="badge">可替换</span>` : `<span class="badge">${base.fixed || "固定"}</span>`}
              ${ex.sets ? `<span class="badge">${ex.sets} 组</span>` : ""}
            </div>
          </div>
          <label class="check" title="标记完成">
            <input type="checkbox" data-check="${base.slot}" ${isDone ? "checked" : ""} aria-label="标记 ${ex.name} 完成">
            <span></span>
          </label>
        </div>
        <div class="ex-body">
          <div class="demo-wrap">
            <div class="demo" data-demo="${ex.demo}"></div>
            <div class="demo-caption">循环演示</div>
            <div class="demo-arc">${DEMOS[ex.demo] && DEMOS[ex.demo].note ? DEMOS[ex.demo].note : "慢速控制"}</div>
            <div class="demo-view">${DEMOS[ex.demo] && DEMOS[ex.demo].view === "front" ? "正面" : "侧面"}</div>
          </div>
          <div class="ex-info">
            <div class="prescription">
              <div><b>${ex.sets}</b><span>组</span></div>
              <div><b>${ex.reps}</b><span>次数</span></div>
              <div><b>${ex.rir}</b><span>RIR</span></div>
              <div><b>${ex.rest}</b><span>休息</span></div>
            </div>
            <div class="muscle-chips">${muscleChips(ex)}</div>
            <p class="cue">${ex.cues}</p>
            <details class="why"><summary>为什么放在这里 / 动作取舍</summary><p>${ex.why}</p></details>
            <div class="alt-row"><label>本周替代</label>${optionsHTML(base, st)}</div>
          </div>
        </div>
      </article>`;
  }

  const demoInstances = new Map();

  function renderDay(day) {
    const list = document.querySelector(`[data-list="${day}"]`);
    if (!list) return;
    const panel = document.getElementById(`day-${day}`);
    const cards = EXERCISES[day].map((base, index) => {
      const { ex, st } = resolveExercise(day, base.slot);
      return { base, ex, st, index };
    });
    list.innerHTML = cards.map(({ base, ex, st, index }) => cardHTML(day, ex, base, st, index)).join("");
    cards.forEach(({ base, ex, st }) => {
      const card = list.querySelector(`[data-slot="${base.slot}"]`);
      if (!card) return;
      const host = card.querySelector(".demo");
      const key = `${day}:${base.slot}`;
      const old = demoInstances.get(key);
      if (old) old.destroy();
      const instance = new ExerciseDemo(host, ex.demo);
      demoInstances.set(key, instance);
      card.addEventListener("mouseenter", () => selectMuscles(panel, ex, false));
      card.addEventListener("focus", () => selectMuscles(panel, ex, false));
      card.addEventListener("click", (ev) => {
        if (ev.target.closest("select, input, summary, label, a, button")) return;
        selectMuscles(panel, ex, true);
      });
      card.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          if (ev.target.closest("select, input, summary, label, a, button")) return;
          ev.preventDefault();
          selectMuscles(panel, ex, true);
        }
      });
      card.querySelector("[data-check]").addEventListener("change", (ev) => {
        st.done = ev.target.checked;
        card.classList.toggle("is-done", st.done);
        saveState();
        updateProgress(day);
      });
      const sel = card.querySelector("[data-alt-select]");
      if (sel) {
        sel.addEventListener("change", (ev) => {
          st.alt = ev.target.value;
          saveState();
          renderDay(day);
          const newCard = document.querySelector(`#day-${day} [data-slot="${base.slot}"]`);
          if (newCard) {
            newCard.classList.add("is-active");
            setTimeout(() => newCard.classList.remove("is-active"), 900);
            const { ex: newEx } = resolveExercise(day, base.slot);
            selectMuscles(panel, newEx, true);
          }
        });
      }
    });
    updateProgress(day);
  }

  function updateProgress(day) {
    const panel = document.getElementById(`day-${day}`);
    if (!panel) return;
    const total = EXERCISES[day].length;
    const done = EXERCISES[day].filter((ex) => getSlotState(day, ex.slot).done).length;
    const text = panel.querySelector("[data-progress-text]");
    const bar = panel.querySelector("[data-progress-bar]");
    if (text) text.textContent = `${done} / ${total}`;
    if (bar) bar.style.width = `${(done / total) * 100}%`;
  }

  function selectMuscles(panel, ex, pin) {
    if (!panel) return;
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
      readout.innerHTML = `<p class="mr-title">${ex.name}</p><p>${ex.cues}</p><div class="mr-list">${p.map((x) => `<span>${x}</span>`).join("")}${s.map((x) => `<span style="opacity:.65">${x}</span>`).join("")}</div>`;
    }
    if (pin) {
      panel.querySelectorAll(".exercise-card").forEach((c) => c.classList.remove("is-active"));
      const card = panel.querySelector(`[data-slot="${ex.slot}"]`);
      if (card) card.classList.add("is-active");
    }
  }

  function selectFirst(day) {
    const base = EXERCISES[day] && EXERCISES[day][0];
    if (!base) return;
    const panel = document.getElementById(`day-${day}`);
    if (!panel) return;
    const { ex } = resolveExercise(day, base.slot);
    selectMuscles(panel, ex, false);
  }

  function switchDay(day, scroll) {
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
    if (scroll) {
      const nav = document.getElementById("dayNav");
      if (nav) window.scrollTo({ top: nav.offsetTop + 1, behavior: reduceMotion ? "auto" : "smooth" });
    }
    if (history.replaceState) history.replaceState(null, "", `#${day}`);
  }

  function showToast(text) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = text;
    el.classList.add("is-on");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => el.classList.remove("is-on"), 2200);
  }

  function init() {
    renderBodyMaps();
    ["push", "pull", "squat"].forEach(renderDay);
    selectFirst("push");

    document.querySelectorAll(".day-tab").forEach((tab) => {
      tab.addEventListener("click", () => switchDay(tab.dataset.day, false));
    });

    document.querySelectorAll("[data-reset]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const day = btn.dataset.reset;
        EXERCISES[day].forEach((ex) => { getSlotState(day, ex.slot).done = false; });
        saveState();
        renderDay(day);
        selectFirst(day);
        showToast("已重置完成度");
      });
    });

    const hash = (location.hash || "").replace("#", "");
    if (["push", "pull", "squat"].includes(hash)) switchDay(hash, false);

    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
      const rec = recommendDay();
      startBtn.textContent = rec.today ? "开始今天的训练" : "查看下一次训练";
      startBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        switchDay(rec.day, true);
        showToast(rec.today ? `今天建议：${DAYS[rec.day].label}` : `今天按计划休息 / 有氧 · 下一次：${DAYS[rec.day].label}`);
      });
    }

    const printBtn = document.getElementById("printBtn");
    if (printBtn) printBtn.addEventListener("click", () => window.print());

    const shareBtn = document.getElementById("shareBtn");
    if (shareBtn) {
      shareBtn.addEventListener("click", async () => {
        const url = location.href;
        try {
          await navigator.clipboard.writeText(url);
          showToast("链接已复制");
        } catch (err) {
          const ta = document.createElement("textarea");
          ta.value = url;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); showToast("链接已复制"); }
          catch (e) { showToast("请手动复制地址栏链接"); }
          ta.remove();
        }
      });
    }

    // Keep the SVG loops from drifting too far after tab switches.
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) demoStart = performance.now();
    });
  }

  function recommendDay() {
    const d = new Date().getDay(); // 0 Sun ... 6 Sat
    if (d === 1) return { day: "push", today: true };
    if (d === 3) return { day: "pull", today: true };
    if (d === 5) return { day: "squat", today: true };
    if (d === 2) return { day: "pull", today: false };
    if (d === 4) return { day: "squat", today: false };
    return { day: "push", today: false };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
