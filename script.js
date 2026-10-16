const NAME_PATTERNS = {
    npc_drgbase: { prefix: 'npc_drg_', suffix: '_nextbot' },
    npc_nextbot: { prefix: 'npc_',     suffix: '_nextbot' },
    npc_308:     { prefix: 'npc_308_', suffix: '' },
    weapon:      { prefix: 'weapon_',  suffix: '' }
};

const BASE_HINTS = {
    drgbase: 'DrGBase. Melee + ranged. Needs DrGBase addon.',
    nextbot: 'base_nextbot. Melee only. No extra addons.',
    '308':   '308 / x308. Uses HP + AttRange. Needs 308 base.'
};

const BEHAVIOR_HINTS = {
    passive: 'Wanders. Does not attack.',
    melee:   'Chases the player and hits at close range.',
    ranged:  'Keeps distance and fires projectiles.',
    both:    'Melee at close range, ranged at distance.'
};

const DISPOSITION_HINTS = {
    hostile:  'Attacks on sight.',
    neutral:  'Ignores until attacked.',
    friendly: 'Allied. Does not attack.'
};

const WEAPON_TYPE_HINTS = {
    gun:   'Hitscan. Uses clip + reserve ammo.',
    melee: 'Eye-trace swing. Uses attack range.',
    dual:  'Paired pistols. Same stats as gun.',
    tool:  'Eye-trace zap. No ammo.'
};

const BEHAVIOR_VALUES = {
    passive: { melee: 0,  ranged: 0,    reach: 0,   avoid: 0,   hasMelee: false, hasRanged: false },
    melee:   { melee: 90, ranged: 0,    reach: 65,  avoid: 0,   hasMelee: true,  hasRanged: false },
    ranged:  { melee: 0,  ranged: 1000, reach: 800, avoid: 350, hasMelee: false, hasRanged: true  },
    both:    { melee: 90, ranged: 1000, reach: 65,  avoid: 0,   hasMelee: true,  hasRanged: true  }
};

const FALLBACKS = {
    addon: 'my_addon',
    entName: 'my_entity',
    printName: 'My Entity',
    credit: 'null',
    npcDrgModel: 'models/zombie/classic.mdl',
    npcNextbotModel: 'models/zombie/classic.mdl',
    npc308Model: 'models/Humans/Group01/male_07.mdl',
    weaponModel: 'models/weapons/w_pistol.mdl',
    wmodel: 'models/weapons/w_pistol.mdl',
    vmodel: 'models/weapons/v_pistol.mdl',
    projectileModel: 'models/hunter/misc/sphere025x025.mdl',
    projectileScale: 1,
    projectileSpeed: 1500,
    projectileColor: '#ffaa44',
    health: 100,
    walk: 100,
    run: 200,
    damage: 10,
    clipSize: 30,
    ammoType: 'ar2',
    fireDelay: 0.1,
    attackRange: 75,
    meleeCooldown: 1.5,
    shotDelay: 1.2,
    soundFire: 'Weapon_AR2.Single',
    vmodelFov: 54,
};

const TYPE_LABELS = { npc: 'NPC', weapon: 'Weapon' };
const BASE_LABELS = { drgbase: 'DrGBase', nextbot: 'Nextbot', '308': '308' };
const WTYPE_LABELS = { gun: 'Gun', melee: 'Melee', dual: 'Dual', tool: 'Tool' };

const PRESETS = {
    zombie: {
        type: 'npc', base: 'drgbase', behavior: 'melee', disposition: 'hostile',
        fields: {
            addon_name: 'zombie_addon', ent_name: 'zombie', print_name: 'Zombie',
            model: 'models/zombie/classic.mdl',
            health: '100', walk_speed: '80', run_speed: '120', damage: '12',
            faction: 'FACTION_ZOMBIE', hate: 'players', like: 'same_faction'
        }
    },
    metrocop: {
        type: 'npc', base: '308', behavior: 'melee', disposition: 'hostile',
        fields: {
            addon_name: 'metrocop_addon', ent_name: 'metrocop', print_name: 'Metrocop',
            model: 'models/police.mdl',
            health: '75', walk_speed: '100', run_speed: '200', damage: '10',
            faction: 'FACTION_COP', hate: 'players', like: 'same_faction'
        }
    },
    soldier: {
        type: 'npc', base: '308', behavior: 'ranged', disposition: 'hostile',
        fields: {
            addon_name: 'soldier_addon', ent_name: 'soldier', print_name: 'Soldier',
            model: 'models/combine_soldier.mdl',
            health: '80', walk_speed: '120', run_speed: '200', damage: '8',
            faction: 'FACTION_COMBINE', hate: 'players', like: 'same_faction'
        }
    },
    nextbot: {
        type: 'npc', base: 'nextbot', behavior: 'melee', disposition: 'hostile',
        fields: {
            addon_name: 'nextbot_addon', ent_name: 'hunter', print_name: 'Hunter',
            model: 'models/zombie/fast.mdl',
            health: '150', walk_speed: '100', run_speed: '250', damage: '15'
        }
    },
    rifle: {
        type: 'weapon', weaponType: 'gun', automatic: 'auto',
        fields: {
            addon_name: 'rifle_addon', ent_name: 'rifle', print_name: 'Rifle',
            wmodel: 'models/weapons/w_rif_m4a1.mdl', vmodel: 'models/weapons/cstrike/c_rif_m4a1.mdl',
            damage: '25', clip_size: '30', ammo_type: 'ar2', fire_delay: '0.1',
            sound_fire: 'Weapon_AR2.Single'
        }
    },
    crowbar: {
        type: 'weapon', weaponType: 'melee',
        fields: {
            addon_name: 'crowbar_addon', ent_name: 'crowbar', print_name: 'Crowbar',
            wmodel: 'models/weapons/w_crowbar.mdl', vmodel: 'models/weapons/v_crowbar.mdl',
            damage: '40', fire_delay: '0.4', attack_range: '75',
            sound_fire: 'Weapon_Crowbar.Single'
        }
    },
    dual: {
        type: 'weapon', weaponType: 'dual', automatic: 'semi',
        fields: {
            addon_name: 'dual_addon', ent_name: 'dual_pistols', print_name: 'Dual Pistols',
            wmodel: 'models/weapons/w_pistol.mdl', vmodel: 'models/weapons/cstrike/c_pist_elite.mdl',
            damage: '12', clip_size: '18', ammo_type: 'pistol', fire_delay: '0.15',
            sound_fire: 'Weapon_Pistol.Single'
        }
    },
};

const MODEL_CATALOG = {
    "NPCs": [
        "models/zombie/classic.mdl",
        "models/zombie/fast.mdl",
        "models/zombie/poison.mdl",
        "models/headcrabclassic.mdl",
        "models/antlion.mdl",
        "models/antlion_guard.mdl",
        "models/vortigaunt.mdl",
        "models/combine_soldier.mdl",
        "models/combine_super_soldier.mdl",
        "models/police.mdl",
        "models/Humans/Group01/male_07.mdl"
    ],
    "World Models": [
        "models/weapons/w_pistol.mdl",
        "models/weapons/w_357.mdl",
        "models/weapons/w_smg1.mdl",
        "models/weapons/w_shotgun.mdl",
        "models/weapons/w_crowbar.mdl",
        "models/weapons/w_knife_t.mdl",
        "models/weapons/w_rif_ak47.mdl",
        "models/weapons/w_rif_m4a1.mdl",
        "models/weapons/w_snip_awp.mdl",
        "models/weapons/w_pist_elite.mdl",
        "models/weapons/w_pist_deagle.mdl"
    ],
    "View Models": [
        "models/weapons/v_pistol.mdl",
        "models/weapons/c_357.mdl",
        "models/weapons/v_smg1.mdl",
        "models/weapons/v_shotgun.mdl",
        "models/weapons/v_crowbar.mdl",
        "models/weapons/v_knife_t.mdl",
        "models/weapons/cstrike/c_rif_ak47.mdl",
        "models/weapons/cstrike/c_rif_m4a1.mdl",
        "models/weapons/cstrike/c_snip_awp.mdl",
        "models/weapons/cstrike/c_pist_elite.mdl"
    ],
    
    "Projectiles": [
        "models/hunter/misc/sphere025x025.mdl",
        "models/hunter/misc/sphere050x050.mdl",
        "models/hunter/blocks/cube025x025x025.mdl",
        "models/weapons/w_eq_fraggrenade.mdl",
        "models/props_c17/oildrum001.mdl",
        "models/props_junk/watermelon01.mdl",
        "models/props_junk/garbage_bag001a.mdl",
        "models/props_c17/furniturechair001a.mdl",
        "models/props_lab/crematorcase.mdl"
    ]
};

const state = {
    type: 'weapon',
    base: 'drgbase',
    behavior: 'melee',
    disposition: 'hostile',
    weaponType: 'gun',
    automatic: 'auto',
    theme: 'dark',
    advanced: false,
    lastResult: null
};

const SIMPLE_MAPS = {
    tough_weak: { health: 50, damage: 8 },
    tough_normal: { health: 100, damage: 12 },
    tough_tough: { health: 250, damage: 20 },
    tough_boss: { health: 1000, damage: 35 },
    speed_slow: { walk: 60, run: 100 },
    speed_normal: { walk: 100, run: 200 },
    speed_fast: { walk: 140, run: 320 },
    power_light: { damage: 12 },
    power_standard: { damage: 25 },
    power_heavy: { damage: 45 },
    rate_slow: { fire_delay: 0.25 },
    rate_standard: { fire_delay: 0.12 },
    rate_rapid: { fire_delay: 0.06 }
};

const SIMPLE_FACTIONS = {
    zombies: { faction: 'FACTION_ZOMBIE', disposition: 'hostile', hate: 'players', like: 'same_faction', hint: 'Attacks players. Friends with zombies.' },
    enemies: { faction: 'FACTION_COMBINE', disposition: 'hostile', hate: 'players', like: 'same_faction', hint: 'Attacks players. Friends with Combine.' },
    allies: { faction: 'FACTION_REBELS', disposition: 'friendly', hate: 'FACTION_ZOMBIE, FACTION_COMBINE', like: 'players', hint: 'Defends players. Fights zombies + Combine.' },
    rebels: { faction: 'FACTION_REBELS', disposition: 'neutral', hate: '', like: 'same_faction', hint: 'Ignores everyone until attacked.' },
    neutral: { faction: '', disposition: 'neutral', hate: '', like: '', hint: 'Ignores everyone.' }
};

let syncingSimple = false;

function setNum(id, v) { const el = $(id); if (el) el.value = String(v); }

function applySimple(key) {
    const m = SIMPLE_MAPS[key];
    if (!m) return;
    syncingSimple = true;
    if ('health' in m) { setNum('health', m.health); setNum('s_health', m.health); }
    if ('damage' in m) { setNum('damage', m.damage); setNum('s_damage', m.damage); setNum('s_wdamage', m.damage); }
    if ('walk' in m) { setNum('walk_speed', m.walk); setNum('s_walk', m.walk); }
    if ('run' in m) { setNum('run_speed', m.run); setNum('s_run', m.run); }
    if ('fire_delay' in m) { setNum('fire_delay', m.fire_delay); setNum('s_firedelay', m.fire_delay); }
    document.querySelectorAll('.pill[data-simple]').forEach(p => {
        const group = p.dataset.simple.split('_')[0];
        const curGroup = key.split('_')[0];
        if (group === curGroup) p.classList.toggle('active', p.dataset.simple === key);
    });
    syncingSimple = false;
    updateSummary();
}

function applySimpleFaction(key) {
    const m = SIMPLE_FACTIONS[key];
    if (!m) return;
    syncingSimple = true;
    setStr('faction', m.faction);
    setStr('hate', m.hate);
    setStr('like', m.like);
    state.disposition = m.disposition;
    document.querySelectorAll('.pill[data-sfaction]').forEach(p => p.classList.toggle('active', p.dataset.sfaction === key));
    document.querySelectorAll('.pill[data-disp]').forEach(c => c.classList.toggle('active', c.dataset.disp === state.disposition));
    const h = $('simple-faction-hint'); if (h) h.textContent = m.hint + ' Details stay editable in Advanced → Team.';
    const dh = $('disposition-hint'); if (dh) dh.textContent = DISPOSITION_HINTS[state.disposition] || '';
    syncingSimple = false;
    updateSummary();
}

function setStr(id, v) { const el = $(id); if (el) el.value = v; }

function pushSimpleStatsToAdvanced() {
    if (syncingSimple) return;
    syncingSimple = true;
    if (state.type === 'npc') {
        if ($('s_health') && $('s_health').value.trim() !== '') setNum('health', $('s_health').value.trim());
        if ($('s_damage') && $('s_damage').value.trim() !== '') setNum('damage', $('s_damage').value.trim());
        if ($('s_walk') && $('s_walk').value.trim() !== '') setNum('walk_speed', $('s_walk').value.trim());
        if ($('s_run') && $('s_run').value.trim() !== '') setNum('run_speed', $('s_run').value.trim());
    } else {
        if ($('s_wdamage') && $('s_wdamage').value.trim() !== '') setNum('damage', $('s_wdamage').value.trim());
        if ($('s_firedelay') && $('s_firedelay').value.trim() !== '') setNum('fire_delay', $('s_firedelay').value.trim());
        if ($('s_clip') && $('s_clip').value.trim() !== '') setNum('clip_size', $('s_clip').value.trim());
    }
    syncingSimple = false;
    updateSummary();
}

function pullAdvancedStatsToSimple() {
    syncingSimple = true;
    const copyIfSet = (srcId, dstId) => {
        const v = raw(srcId);
        setNum(dstId, v);
    };
    copyIfSet('health', 's_health');
    copyIfSet('damage', 's_damage');
    copyIfSet('walk_speed', 's_walk');
    copyIfSet('run_speed', 's_run');
    copyIfSet('damage', 's_wdamage');
    copyIfSet('fire_delay', 's_firedelay');
    copyIfSet('clip_size', 's_clip');
    const f = (raw('faction') || '').toUpperCase();
    const h = (raw('hate') || '');
    const l = (raw('like') || '');
    if (f === '' && h === '' && l === '') {
        document.querySelectorAll('.pill[data-sfaction]').forEach(p => p.classList.remove('active'));
        const hint = $('simple-faction-hint');
        if (hint) hint.textContent = 'Who it fights with. Details stay editable in Advanced → Team.';
    } else {
        let guess = 'neutral';
        if (f.includes('ZOMBIE')) guess = 'zombies';
        else if (f.includes('COMBINE') || f.includes('COP') || f.includes('ENEMY')) guess = 'enemies';
        else if (f.includes('REBELS') && state.disposition === 'friendly') guess = 'allies';
        else if (f.includes('REBELS')) guess = 'rebels';
        document.querySelectorAll('.pill[data-sfaction]').forEach(p => p.classList.toggle('active', p.dataset.sfaction === guess));
        const m = SIMPLE_FACTIONS[guess];
        const hint = $('simple-faction-hint');
        if (hint && m) hint.textContent = m.hint + ' Details stay editable in Advanced → Team.';
    }
    syncingSimple = false;
}

function setMode(advanced) {
    state.advanced = !!advanced;
    const ms = $('mode-simple'), ma = $('mode-advanced');
    if (ms) { ms.classList.toggle('active', !state.advanced); ms.setAttribute('aria-selected', String(!state.advanced)); }
    if (ma) { ma.classList.toggle('active', state.advanced); ma.setAttribute('aria-selected', String(state.advanced)); }
    updateFields();
    if (!state.advanced) pullAdvancedStatsToSimple();
}

function $(id) { return document.getElementById(id); }
function val(id, fb) { const el = $(id); if (!el) return fb; const v = el.value.trim(); return v === '' ? fb : v; }
function raw(id) { const el = $(id); return el ? el.value.trim() : ''; }
function num(id, fb, min, max) {
    const el = $(id); if (!el) return fb;
    let n = parseFloat(el.value); if (!isFinite(n)) n = fb;
    if (typeof min === 'number' && n < min) n = min;
    if (typeof max === 'number' && n > max) n = max;
    return n;
}
function int(id, fb, min, max) { return Math.floor(num(id, fb, min, max)); }

function slug(str, fb) {
    const v = (str || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    return v === '' ? fb : v;
}
function luaStr(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
}

function currentTemplateKey() {
    if (state.type === 'weapon') return 'weapon_' + state.weaponType;
    if (state.type === 'npc') {
        if (state.base === 'drgbase') return 'npc_drgbase';
        if (state.base === 'nextbot') return 'npc_nextbot';
        if (state.base === '308') return 'npc_308';
    }
    return null;
}

function defaultModelFor(key) {
    if (key === 'npc_drgbase') return FALLBACKS.npcDrgModel;
    if (key === 'npc_nextbot') return FALLBACKS.npcNextbotModel;
    if (key === 'npc_308') return FALLBACKS.npc308Model;
    if (key && key.indexOf('weapon_') === 0) return FALLBACKS.weaponModel;
    return FALLBACKS.npcDrgModel;
}

function cleanEntName(rawName) {
    return rawName.replace(/^npc_drg_/, '').replace(/^npc_308_/, '').replace(/^npc_/, '')
        .replace(/^ent_/, '').replace(/^weapon_/, '').replace(/_nextbot$/, '');
}

function buildClassName(baseName) {
    const key = currentTemplateKey();
    const p = NAME_PATTERNS[key] || NAME_PATTERNS.weapon;
    return p.prefix + baseName + p.suffix;
}

function buildPath(addon, cls) {
    if (state.type === 'weapon') return 'addons/' + addon + '/lua/weapons/' + cls + '.lua';
    return 'addons/' + addon + '/lua/entities/' + cls + '.lua';
}

function authorValue(name) {
    const c = (name || '').trim();
    if (c === '' || c === 'null') return 'Anonymous';
    return c;
}

function creditLine(name) {
    const c = (name || '').trim();
    if (c === '' || c === 'null') return '-- Created by Anonymous\n\n';
    return '-- Created by ' + c + '\n\n';
}

function parseList(text) {
    return (text || '').split(',').map(x => x.trim()).filter(x => x !== '').map(luaStr);
}
function buildModelsTable(single, list) {
    const extras = parseList(list);
    if (extras.length === 0) return '{"' + luaStr(single) + '"}';
    if (extras.indexOf(luaStr(single)) === -1) extras.unshift(luaStr(single));
    return '{' + extras.map(x => '"' + x + '"').join(', ') + '}';
}
function buildFactionsTable(f) {
    const parts = parseList(f);
    if (parts.length === 0) return '{}';
    return '{' + parts.map(x => '"' + x + '"').join(', ') + '}';
}

function buildDrgRel(hate, like, faction, disp) {
    const lines = [];
    if (disp === 'hostile') lines.push('        self:SetDefaultRelationship(D_HT)');
    else if (disp === 'friendly') lines.push('        self:SetDefaultRelationship(D_LI)');
    else lines.push('        self:SetDefaultRelationship(D_NU)');
    const h = (hate || '').trim(), hl = h.toLowerCase();
    if (h !== '') {
        if (hl === 'players') lines.push('        self:SetPlayersRelationship(D_HT, 100)');
        else if (hl === 'everything') lines.push('        self:SetDefaultRelationship(D_HT)');
        else parseList(h).forEach(x => lines.push('        self:SetFactionRelationship("' + x + '", D_HT, 100)'));
    }
    const l = (like || '').trim(), ll = l.toLowerCase();
    if (l !== '') {
        if (ll === 'players') lines.push('        self:SetPlayersRelationship(D_LI, 100)');
        else if (ll === 'same_faction') parseList(faction).forEach(x => lines.push('        self:SetFactionRelationship("' + x + '", D_LI, 100)'));
        else if (ll !== 'none') parseList(l).forEach(x => lines.push('        self:SetFactionRelationship("' + x + '", D_LI, 100)'));
    }
    if (lines.length === 0) lines.push('        -- no relationships configured');
    return lines.join('\n');
}

function build308Rel(hate) {
    const lines = [];
    const h = (hate || '').trim(), hl = h.toLowerCase();
    if (hl === 'players') {
        lines.push('        for _, ply in ipairs(player.GetAll()) do');
        lines.push('            self:SetRelationships(ply, D_HT)');
        lines.push('        end');
    } else if (hl === 'everything') {
        lines.push('        for _, ent in ipairs(ents.GetAll()) do');
        lines.push('            if ent ~= self and (ent:IsPlayer() or ent:IsNPC()) then');
        lines.push('                self:SetRelationships(ent, D_HT)');
        lines.push('            end');
        lines.push('        end');
    }
    if (lines.length === 0) lines.push('        -- uses 308 defaults');
    return lines.join('\n');
}

function buildMeleeBlock(behavior, sound) {
    if (behavior !== 'melee' && behavior !== 'both') return '';
    const s = sound ? '\n        if self.AttackSound and self.AttackSound ~= "" then self:EmitSound(self.AttackSound) end' : '';
    return '\n    function ENT:OnMeleeAttack(enemy)\n        if not IsValid(enemy) then return false end\n        if self.NextMelee and CurTime() < self.NextMelee then return false end\n        self.NextMelee = CurTime() + (self.MeleeCooldown or 1.5)\n' + s + '\n        local dmg = DamageInfo()\n        dmg:SetDamage(self.MeleeDamage or 10)\n        dmg:SetDamageType(DMG_DIRECT)\n        dmg:SetAttacker(self)\n        dmg:SetInflictor(self)\n        dmg:SetDamageForce(self:GetForward() * (self.MeleeForce or 1000))\n        enemy:TakeDamageInfo(dmg)\n        return true\n    end\n';
}

function buildRangedBlock(behavior) {
    if (behavior !== 'ranged' && behavior !== 'both') return '';
    return [
        '',
        '    function ENT:SpawnProjectile(enemy)',
        '        local proj = ents.Create("base_anim")',
        '        if not IsValid(proj) then return nil end',
        '        proj:SetModel(self.ProjectileModel or "models/hunter/misc/sphere025x025.mdl")',
        '        proj:SetPos(self:WorldSpaceCenter() + self:GetForward() * 30)',
        '        proj:Spawn()',
        '        proj:Activate()',
        '        if not IsValid(proj) then return nil end',
        '        proj:SetMoveType(MOVETYPE_NONE)',
        '        proj:SetSolid(SOLID_NONE)',
        '        proj:SetNotSolid(true)',
        '        proj:SetCollisionGroup(COLLISION_GROUP_IN_VEHICLE)',
        '        proj:DrawShadow(false)',
        '        if self.ProjectileColor then proj:SetColor(self.ProjectileColor) end',
        '        local scale = tonumber(self.ProjectileScale) or 1',
        '        if scale ~= 1 then proj:SetModelScale(scale, 0) end',
        '        proj.XAC_Owner = self',
        '        proj.XAC_Damage = tonumber(self.MeleeDamage) or 10',
        '        proj.XAC_Done = false',
        '        proj.XAC_Born = CurTime()',
        '        proj.XAC_Life = 5',
        '        local dir = (enemy:WorldSpaceCenter() - proj:GetPos()):GetNormalized()',
        '        proj.XAC_Vel = dir * math.max(100, tonumber(self.ProjectileSpeed) or 1500)',
        '        proj.Think = function(ent)',
        '            if not IsValid(ent) then return end',
        '            if ent.XAC_Done then return end',
        '            if CurTime() - ent.XAC_Born > ent.XAC_Life then ent:Remove() return end',
        '            local vel = ent.XAC_Vel',
        '            if not vel then ent:Remove() return end',
        '            local nextPos = ent:GetPos() + vel * FrameTime()',
        '            local tr = util.TraceHull({',
        '                start = ent:GetPos(),',
        '                endpos = nextPos,',
        '                mins = Vector(-4, -4, -4),',
        '                maxs = Vector(4, 4, 4),',
        '                mask = MASK_SHOT,',
        '                filter = { ent, ent.XAC_Owner },',
        '            })',
        '            if tr.Hit then',
        '                ent.XAC_Done = true',
        '                local hit = tr.Entity',
        '                local owner = ent.XAC_Owner',
        '                if IsValid(hit) and hit ~= owner then',
        '                    local dmg = DamageInfo()',
        '                    dmg:SetDamage(ent.XAC_Damage or 10)',
        '                    dmg:SetAttacker(owner or ent)',
        '                    dmg:SetInflictor(ent)',
        '                    dmg:SetDamagePosition(tr.HitPos)',
        '                    dmg:SetDamageType(DMG_DIRECT)',
        '                    hit:TakeDamageInfo(dmg)',
        '                end',
        '                if owner and owner.ProjectileImpactSound and owner.ProjectileImpactSound ~= "" then',
        '                    ent:EmitSound(owner.ProjectileImpactSound)',
        '                end',
        '                ent:Remove()',
        '                return',
        '            end',
        '            ent:SetPos(nextPos)',
        '            ent:SetAngles(vel:Angle())',
        '            ent:NextThink(CurTime())',
        '            return true',
        '        end',
        '        return proj',
        '    end',
        '',
        '    function ENT:OnRangeAttack(enemy)',
        '        if not IsValid(enemy) then return false end',
        '        self.NextShot = self.NextShot or 0',
        '        if CurTime() < self.NextShot then return false end',
        '        self.NextShot = CurTime() + (tonumber(self.ShotDelay) or 1.2)',
        '        if self.AttackSound and self.AttackSound ~= "" then',
        '            self:EmitSound(self.AttackSound)',
        '        end',
        '        local p = self:SpawnProjectile(enemy)',
        '        return IsValid(p)',
        '    end',
        ''
    ].join('\n');
}

function animValue(sid, iid) {
    const sel = $(sid), inp = $(iid);
    const custom = inp ? inp.value.trim() : '';
    if (custom !== '') return luaStr(custom);
    if (sel && sel.value) return sel.value;
    return '';
}

function buildNpcAnims() {
    const idle = animValue('anim_idle_act', 'anim_idle');
    const walk = animValue('anim_walk_act', 'anim_walk');
    const run = animValue('anim_run_act', 'anim_run');
    const attack = animValue('anim_attack_act', 'anim_attack');
    const lines = [];
    if (idle) lines.push('ENT.IdleAnimation = "' + idle + '"');
    if (walk) lines.push('ENT.WalkAnimation = "' + walk + '"');
    if (run) lines.push('ENT.RunAnimation = "' + run + '"');
    if (attack) lines.push('ENT.MeleeAttackAnimation = "' + attack + '"');
    if (lines.length === 0) return '';
    return '-- Custom animations.\n' + lines.join('\n');
}

function buildWeaponAnims() {
    const draw = animValue('wep_draw_act', 'wep_draw');
    const idle = animValue('wep_idle_act', 'wep_idle');
    const fire = animValue('wep_fire_act', 'wep_fire');
    const reload = animValue('wep_reload_act', 'wep_reload');
    const lines = [];
    const fmt = (v) => (/^ACT_/.test(v) ? v : '"' + v + '"');
    if (draw) lines.push('SWEP.DrawAct = ' + fmt(draw));
    if (idle) lines.push('SWEP.IdleAct = ' + fmt(idle));
    if (fire) lines.push('SWEP.FireAct = ' + fmt(fire));
    if (reload) lines.push('SWEP.ReloadAct = ' + fmt(reload));
    if (lines.length === 0) return '';
    return '-- Custom animations (ACT enum or sequence fallback to defaults).\n' + lines.join('\n');
}

function buildProjectileFields(show, c) {
    if (!show || !c) return '';
    return 'ENT.ProjectileModel = "' + luaStr(c.projectileModel) + '"\n' +
        'ENT.ProjectileScale = ' + c.projectileScale + '\n' +
        'ENT.ProjectileSpeed = ' + c.projectileSpeed + '\n' +
        'ENT.ProjectileColor = Color(' + c.projectileR + ', ' + c.projectileG + ', ' + c.projectileB + ')';
}

function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m) return { r: 255, g: 255, b: 255 };
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function collectForm() {
    const key = currentTemplateKey();
    const rawName = slug(val('ent_name', ''), FALLBACKS.entName);
    const baseName = cleanEntName(rawName);
    const cls = buildClassName(baseName);
    const rgb = hexToRgb(val('projectile_color', FALLBACKS.projectileColor));
    const customAddon = slug(raw('addon_name'), '');
    const addon = fixedFolderOn() || customAddon || cls.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const rawClip = raw('clip_size');
    let clipSize;
    if (rawClip === '-1') clipSize = -1;
    else clipSize = int('clip_size', FALLBACKS.clipSize, 1, 1000);
    return {
        credit: luaStr(val('credit', FALLBACKS.credit)),
        className: cls,
        addon: addon,
        printName: luaStr(val('print_name', FALLBACKS.printName)),
        model: luaStr(val('model', defaultModelFor(key))),
        modelList: raw('model_list'),
        wmodel: luaStr(val('wmodel', FALLBACKS.wmodel)),
        vmodel: luaStr(val('vmodel', FALLBACKS.vmodel)),
        projectileModel: luaStr(val('projectile_model', FALLBACKS.projectileModel)),
        projectileScale: num('projectile_scale', FALLBACKS.projectileScale, 0.1, 10),
        projectileSpeed: num('projectile_speed', FALLBACKS.projectileSpeed, 100, 5000),
        projectileR: rgb.r,
        projectileG: rgb.g,
        projectileB: rgb.b,
        health: int('health', FALLBACKS.health, 1, 100000),
        walk: num('walk_speed', FALLBACKS.walk, 1, 2000),
        run: num('run_speed', FALLBACKS.run, 1, 2000),
        damage: num('damage', FALLBACKS.damage, 0, 100000),
        clipSize: clipSize,
        ammoType: luaStr(val('ammo_type', FALLBACKS.ammoType)),
        fireDelay: num('fire_delay', FALLBACKS.fireDelay, 0.01, 5),
        attackRange: num('attack_range', FALLBACKS.attackRange, 10, 5000),
        meleeCooldown: num('melee_cooldown', FALLBACKS.meleeCooldown, 0.1, 30),
        shotDelay: num('shot_delay', FALLBACKS.shotDelay, 0.1, 30),
        vmodelFov: int('vmodel_fov', FALLBACKS.vmodelFov, 10, 120),
        soundFire: luaStr(val('sound_fire', FALLBACKS.soundFire)),
        soundReload: luaStr(raw('sound_reload') || ''),
        npcSoundAttack: luaStr(raw('npc_sound_attack') || ''),
        npcSoundProjectile: luaStr(raw('npc_sound_projectile') || ''),
        faction: raw('faction'),
        hate: raw('hate'),
        like: raw('like')
    };
}

function fill(tpl, vars) {
    if (!tpl) return '-- template not found';
    const out = tpl.replace(/\[([A-Z_0-9]+)\]/g, (m, k) => {
        if (!(k in vars)) return m;
        const v = vars[k];
        if (v === undefined || v === null) return '';
        return String(v);
    });
    const leftover = out.match(/\[([A-Z_0-9]+)\]/g);
    if (leftover) console.error('Unreplaced placeholders:', [...new Set(leftover)].join(', '));
    return out;
}

function highlight(lua) {
    if (!lua) return '';
    let esc = lua.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    esc = esc.replace(/(--[^\n]*)/g, '\x01$1\x02');
    esc = esc.replace(/"([^"\n]*)"/g, '\x03$1\x04');
    esc = esc.replace(/\b(if|then|end|else|elseif|for|while|do|return|local|function|and|or|not|true|false|nil|break|in|repeat|until)\b/g, '<span class="k">$1</span>');
    esc = esc.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="n">$1</span>');
    esc = esc.replace(/\x03([^\x04]*)\x04/g, '<span class="s">"$1"</span>');
    esc = esc.replace(/\x01([^\x02]*)\x02/g, '<span class="c">$1</span>');
    return esc;
}

function highlightLines(lua) {
    if (!lua) return '';
    const lines = lua.split('\n');
    const w = String(lines.length).length;
    let out = '';
    for (let i = 0; i < lines.length; i++) {
        const n = String(i + 1).padStart(w, ' ');
        out += '<span class="ln">' + n + '</span> ' + highlight(lines[i]) + '\n';
    }
    return out;
}

function toast(msg, kind) {
    const c = $('toasts'); if (!c) return;
    const el = document.createElement('div');
    el.className = 'toast toast-' + (kind || 'info');
    el.textContent = msg;
    c.appendChild(el);
    requestAnimationFrame(() => el.classList.add('toast-show'));
    setTimeout(() => { el.classList.remove('toast-show'); setTimeout(() => el.remove(), 300); }, 2400);
}

function flash(id, text) {
    const b = $(id); if (!b) return;
    const old = b.textContent;
    b.textContent = text;
    setTimeout(() => b.textContent = old, 1000);
}

function validateLua(code) {
    const errors = [];
    const lines = code.split('\n');
    let depth = 0;
    for (let i = 0; i < lines.length; i++) {
        let c = lines[i];
        const cidx = c.indexOf('--');
        if (cidx !== -1) c = c.slice(0, cidx);
        c = c.replace(/"(?:[^"\\]|\\.)*"/g, '""');
        const o = (c.match(/\b(function|if|for|while|repeat)\b/g) || []).length;
        const cl = (c.match(/\b(end|until)\b/g) || []).length;
        depth += o - cl;
        if (depth < 0) { errors.push('Line ' + (i + 1)); depth = 0; }
    }
    if (depth !== 0) errors.push('Unbalanced: ' + depth);
    if (/\[([A-Z_0-9]+)\]/.test(code)) errors.push('Unreplaced placeholder');
    return errors;
}

function validateClassName(cls) {
    if (!/^[a-z_][a-z0-9_]*$/.test(cls)) return 'Use lowercase letters, numbers, underscores. Must start with a letter.';
    if (cls.length < 3) return 'Class name too short.';
    return '';
}

function updateSummary() {
    const rawName = slug(val('ent_name', ''), FALLBACKS.entName);
    const cls = buildClassName(cleanEntName(rawName));
    const customAddon = slug(raw('addon_name'), '');
    const addon = fixedFolderOn() || customAddon || cls.toLowerCase().replace(/[^a-z0-9_]/g, '_');
    const path = buildPath(addon, cls);
    const st = $('summary-type'), sc = $('summary-class'), sp = $('summary-path');
    if (sc) sc.textContent = cls;
    if (sp) sp.textContent = path;
    if (st) {
        let label = TYPE_LABELS[state.type];
        if (state.type === 'npc') label += ' / ' + BASE_LABELS[state.base];
        if (state.type === 'weapon') label += ' / ' + WTYPE_LABELS[state.weaponType];
        st.textContent = label;
    }
    const gb = document.getElementById('generate-btn');
    if (gb) {
        const labels = { npc: 'Generate NPC', weapon: 'Generate SWEP' };
        gb.textContent = labels[state.type] || 'Generate Addon';
    }
    const titleMap = { npc: 'NPC', weapon: 'SWEP' };
    document.title = 'Xero Addon Generator - ' + (titleMap[state.type] || 'Addon');
    const ps = $('panel-sub');
    if (ps) {
        let label = TYPE_LABELS[state.type];
        if (state.type === 'npc') label += ' / ' + BASE_LABELS[state.base];
        if (state.type === 'weapon') label += ' / ' + WTYPE_LABELS[state.weaponType];
        ps.textContent = label;
    }
    const hint = $('ent-name-hint');
    if (hint) hint.textContent = cls;
}

function updateCreditPreview() {
    const name = val('credit', 'null');
    const el = $('credit-preview');
    if (!el) return;
    el.textContent = (name === 'null' || name === '') ? '-- Created by Anonymous' : '-- Created by ' + name;
}

function updateFields() {
    const isNPC = state.type === 'npc';
    const isWeapon = state.type === 'weapon';
    const is308 = state.base === '308';
    const isNextbot = state.base === 'nextbot';
    const isDrg = state.base === 'drgbase';
    const isRanged = state.behavior === 'ranged' || state.behavior === 'both';
    const isMeleeBeh = state.behavior === 'melee' || state.behavior === 'both';
    const w = state.weaponType;
    const set = (id, h) => { const el = $(id); if (el) el.hidden = !!h; };
    const isGunLike = w === 'gun' || w === 'dual';

    set('base-section', !isNPC);
    set('behavior-section', !isNPC);
    set('weapon-type-section', !isWeapon);
    set('health-field', !isNPC);
    set('walk-field', !(isNPC && !isNextbot));
    set('run-field', !isNPC || is308);
    set('damage-field', false);
    set('clip-field', !(isWeapon && isGunLike));
    set('ammo-field', !(isWeapon && isGunLike));
    set('fire-delay-field', !isWeapon);
    set('automatic-field', !(isWeapon && isGunLike));
    set('wmodel-field', !isWeapon);
    set('model-field', isWeapon);
    set('vmodel-field', !isWeapon);
    set('vmodel-fov-field', !isWeapon);
    set('model-list-field', !(isNPC && (isDrg || isNextbot)));
    set('fire-sound-field', !isWeapon);
    set('reload-sound-field', !(isWeapon && isGunLike));
    set('npc-sound-field', !(isNPC && isMeleeBeh));
    set('npc-projectile-sound-field', !(isNPC && isDrg && isRanged));
    set('attack-range-field', !(isWeapon && w === 'melee'));
    set('melee-cooldown-field', !(isNPC && isMeleeBeh));
    set('shot-delay-field', !(isNPC && isRanged));
    set('faction-field', !(isNPC && isDrg));
    set('disposition-field', !(isNPC && isDrg));
    set('hate-field', !(isNPC && isDrg && state.behavior !== 'passive'));
    set('like-field', !(isNPC && isDrg && state.behavior !== 'passive'));
    const showProj = isNPC && isRanged && isDrg;
    set('projectile-field', !showProj);
    set('projectile-color-field', !showProj);
    set('projectile-scale-field', !showProj);
    set('projectile-speed-field', !showProj);
    set('npc-anim-field', !(isNPC && isDrg));
    set('weapon-anim-field', !isWeapon);

    set('tough-field', !isNPC);
    set('speed-field', !isNPC);
    set('power-field', !isWeapon);
    set('rate-field', !(isWeapon && w !== 'melee'));
    set('simple-stats-npc', !isNPC);
    set('simple-stats-weapon', !isWeapon);
    set('simple-faction-field', !(isNPC && isDrg));
    set('simple-tune', !(isNPC || isWeapon));
    const sClip = $('s_clip');
    if (sClip && sClip.closest('label')) sClip.closest('label').hidden = !(isWeapon && isGunLike);

    const adv = $('advanced-tab');
    if (adv) {
        if (!state.advanced) adv.setAttribute('hidden', '');
        else {
            adv.removeAttribute('hidden');
            adv.open = true;
        }
    }

    hideEmptySections();

    const bh = $('base-hint'); if (bh) bh.textContent = BASE_HINTS[state.base] || '';
    const bvh = $('behavior-hint'); if (bvh) bvh.textContent = BEHAVIOR_HINTS[state.behavior] || '';
    const dh = $('disposition-hint'); if (dh) dh.textContent = DISPOSITION_HINTS[state.disposition] || '';
    const wh = $('weapon-type-hint'); if (wh) wh.textContent = WEAPON_TYPE_HINTS[w] || '';

    updateSummary();
}

function hideEmptySections() {
    ['stats-section', 'firing-section', 'audio-section', 'team-section', 'projectile-section', 'anims-section', 'model-section'].forEach(sid => {
        const sec = $(sid);
        if (!sec) return;
        const fields = sec.querySelectorAll('.field');
        if (fields.length === 0) return;
        const allHidden = Array.from(fields).every(f => f.hidden);
        if (sec.tagName === 'DETAILS') {
            if (allHidden) sec.setAttribute('hidden', '');
            else sec.removeAttribute('hidden');
        }
    });
}

function generate() {
    const key = currentTemplateKey();
    const tpl = TEMPLATES[key];
    if (!tpl) { toast('Template not found: ' + key, 'error'); return; }

    const c = collectForm();
    const bv = BEHAVIOR_VALUES[state.behavior] || BEHAVIOR_VALUES.melee;
    const isRanged = state.behavior === 'ranged' || state.behavior === 'both';
    const showProj = state.type === 'npc' && isRanged && state.base === 'drgbase';

    const rel = (state.base === '308')
        ? build308Rel(c.hate)
        : buildDrgRel(c.hate, c.like, c.faction, state.disposition);

    const vars = {
        CREDIT: authorValue(c.credit),
        PRINT_NAME: c.printName,
        ADDON_NAME: c.addon,
        MODEL: c.model,
        MODELS_TABLE: buildModelsTable(val('model', defaultModelFor(key)), c.modelList),
        WMODEL: c.wmodel,
        VMODEL: c.vmodel,
        PROJECTILE_MODEL: c.projectileModel,
        PROJECTILE_SCALE: c.projectileScale,
        PROJECTILE_SPEED: c.projectileSpeed,
        PROJECTILE_R: c.projectileR,
        PROJECTILE_G: c.projectileG,
        PROJECTILE_B: c.projectileB,
        HEALTH: c.health,
        WALK_SPEED: c.walk,
        RUN_SPEED: c.run,
        DAMAGE: c.damage,
        CLIP_SIZE: c.clipSize,
        AMMO_TYPE: c.ammoType,
        FIRE_DELAY: c.fireDelay,
        ATTACK_RANGE: c.attackRange,
        VMODEL_FOV: c.vmodelFov,
        MELEE_COOLDOWN: c.meleeCooldown,
        SHOT_DELAY: c.shotDelay,
        AUTOMATIC: state.automatic === 'auto' ? 'true' : 'false',
        FIRE_SOUND: c.soundFire,
        RELOAD_SOUND: c.soundReload,
        NPC_ATTACK_SOUND: c.npcSoundAttack,
        NPC_PROJECTILE_SOUND: c.npcSoundProjectile,
        FACTIONS_TABLE: buildFactionsTable(c.faction),
        RELATIONSHIP_BLOCK: rel,
        PROJECTILE_FIELDS: buildProjectileFields(showProj, c),
        HAS_RANGED_BOOL: bv.hasRanged ? 'true' : 'false',
        RANGE_ATTACK_RANGE: bv.ranged,
        MELEE_ATTACK_RANGE: bv.melee,
        REACH_ENEMY_RANGE: bv.reach,
        AVOID_ENEMY_RANGE: bv.avoid,
        MELEE_BLOCK: buildMeleeBlock(state.behavior, c.npcSoundAttack),
        RANGED_BLOCK: buildRangedBlock(state.behavior),
        NPC_ANIMATIONS: buildNpcAnims(),
        WEAPON_ANIMATIONS: buildWeaponAnims()
    };

    const content = creditLine(c.credit) + fill(tpl, vars);
    const errors = validateLua(content);
    const clsErr = validateClassName(c.className);
    if (clsErr) errors.push(clsErr);
    const status = $('preview-status');
    if (errors.length > 0) {
        if (status) { status.textContent = 'warning'; status.style.color = 'var(--error)'; }
        toast(errors[0], 'error');
    } else {
        if (status) { status.textContent = 'ready'; status.style.color = 'var(--success)'; }
        toast('Generated ' + c.className, 'success');
    }

    const path = buildPath(c.addon, c.className);
    state.lastResult = { path: path, content: content, addon: c.addon, ent: c.className };

    const pc = $('preview-code'); if (pc) pc.innerHTML = highlightLines(content);
    const pp = $('preview-path'); if (pp) pp.textContent = path;
    const pcl = $('preview-class'); if (pcl) pcl.textContent = c.className;

    ['download-btn', 'download-lua-btn', 'copy-btn', 'copy-path-btn', 'preview-copy-btn'].forEach(id => {
        const el = $(id); if (el) el.disabled = false;
    });

    updateSpawnPanel();
    const wrap = document.querySelector('.code-wrap'); if (wrap) wrap.scrollTop = 0;
}

function spawnCommand() {
    if (!state.lastResult) return null;
    const ent = state.lastResult.ent;
    if (state.type === 'weapon') return 'sv_cheats 1; give ' + ent;
    return 'sv_cheats 1; ent_create ' + ent;
}

function updateSpawnPanel() {
    const panel = $('spawn-panel'), code = $('spawn-code');
    if (!panel || !code) return;
    const cmd = spawnCommand();
    if (!cmd) { panel.hidden = true; return; }
    code.textContent = cmd;
    panel.hidden = false;
}

async function downloadZip() {
    const r = state.lastResult; if (!r) return;
    if (typeof JSZip === 'undefined') {
        toast('Zip lib offline — downloading .lua instead', 'warn');
        downloadLua();
        return;
    }
    const zip = new JSZip();
    zip.file(r.path, r.content);
    zip.file('addons/' + r.addon + '/README.txt', 'Xero Addon Generator\n\n1. Extract addons/ into garrysmod/\n2. Restart GMod\n3. Spawn ' + r.ent + '\n');
    const blob = await zip.generateAsync({ type: 'blob' });
    saveBlob(blob, 'addon_' + r.addon + '.zip');
    toast('Zip downloaded', 'success');
}

function downloadLua() {
    const r = state.lastResult; if (!r) return;
    const name = r.path.split('/').pop();
    const blob = new Blob([r.content], { type: 'text/plain;charset=utf-8' });
    saveBlob(blob, name);
    toast('Downloaded ' + name, 'success');
}

function saveBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function copyLua() {
    const r = state.lastResult; if (!r) return;
    copyText(r.content, 'Code copied');
    flash('copy-btn', 'Copied');
}

async function copyPath() {
    const r = state.lastResult; if (!r) return;
    copyText(r.path, 'Path copied');
    flash('copy-path-btn', 'Copied');
}

const PRESET_FIELDS = [
    'addon_name','ent_name','print_name','credit','model','model_list','wmodel','vmodel',
    'projectile_model','projectile_color','projectile_scale','projectile_speed',
    'health','walk_speed','run_speed','damage','clip_size','ammo_type','fire_delay',
    'attack_range','melee_cooldown','shot_delay','sound_fire','sound_reload','npc_sound_attack','npc_sound_projectile',
    'anim_idle','anim_walk','anim_run','anim_attack','wep_draw','wep_idle',
    'wep_fire','wep_reload','faction','hate','like','vmodel_fov'
];
const PRESET_ANIM = ['anim_idle_act','anim_walk_act','anim_run_act','anim_attack_act','wep_draw_act','wep_idle_act','wep_fire_act','wep_reload_act'];

const SIMPLE_FIELDS = ['s_health','s_damage','s_walk','s_run','s_wdamage','s_firedelay','s_clip'];

function applyPreset(p) {
    state.type = p.type || 'weapon';
    state.base = p.base || 'drgbase';
    state.behavior = p.behavior || 'melee';
    state.disposition = p.disposition || 'hostile';
    state.weaponType = p.weaponType || 'gun';
    state.automatic = p.automatic || 'auto';

    PRESET_FIELDS.forEach(id => { const el = $(id); if (el) el.value = ''; });
    PRESET_ANIM.forEach(id => { const el = $(id); if (el) el.value = ''; });
    SIMPLE_FIELDS.forEach(id => { const el = $(id); if (el) el.value = ''; });

    if (p.fields) {
        for (const id in p.fields) {
            const el = $(id); if (el) el.value = p.fields[id];
        }
    }

    document.querySelectorAll('.type-card').forEach(c => c.classList.toggle('active', c.dataset.type === state.type));
    document.querySelectorAll('.pill[data-base]').forEach(c => c.classList.toggle('active', c.dataset.base === state.base));
    document.querySelectorAll('.pill[data-behavior]').forEach(c => c.classList.toggle('active', c.dataset.behavior === state.behavior));
    document.querySelectorAll('.pill[data-disp]').forEach(c => c.classList.toggle('active', c.dataset.disp === state.disposition));
    document.querySelectorAll('.pill[data-wtype]').forEach(c => c.classList.toggle('active', c.dataset.wtype === state.weaponType));
    document.querySelectorAll('.pill[data-auto]').forEach(c => c.classList.toggle('active', c.dataset.auto === state.automatic));
    document.querySelectorAll('.pill[data-simple]').forEach(c => c.classList.toggle('active',
        c.dataset.simple === 'tough_normal' || c.dataset.simple === 'speed_normal' ||
        c.dataset.simple === 'power_standard' || c.dataset.simple === 'rate_standard'));

    updateFields();
    pullAdvancedStatsToSimple();
    updateCreditPreview();
}

function resetSimplePills() {
    document.querySelectorAll('.pill[data-simple]').forEach(c => c.classList.toggle('active',
        c.dataset.simple === 'tough_normal' || c.dataset.simple === 'speed_normal' ||
        c.dataset.simple === 'power_standard' || c.dataset.simple === 'rate_standard'));
    document.querySelectorAll('.pill[data-sfaction]').forEach(c => c.classList.remove('active'));
    SIMPLE_FIELDS.forEach(id => { const el = $(id); if (el) el.value = ''; });
}

function clearForm(silent) {
    PRESET_FIELDS.forEach(id => { const el = $(id); if (el) el.value = ''; });
    PRESET_ANIM.forEach(id => { const el = $(id); if (el) el.value = ''; });
    document.querySelectorAll('.anim-act').forEach(s => s.value = '');

    state.type = 'weapon';
    state.weaponType = 'gun';
    state.base = 'drgbase';
    state.behavior = 'melee';
    state.disposition = 'hostile';
    state.weaponType = 'gun';
    state.automatic = 'auto';
    state.lastResult = null;

    document.querySelectorAll('.type-card').forEach(c => c.classList.toggle('active', c.dataset.type === 'weapon'));
    document.querySelectorAll('.pill[data-base]').forEach(c => c.classList.toggle('active', c.dataset.base === 'drgbase'));
    document.querySelectorAll('.pill[data-behavior]').forEach(c => c.classList.toggle('active', c.dataset.behavior === 'melee'));
    document.querySelectorAll('.pill[data-disp]').forEach(c => c.classList.toggle('active', c.dataset.disp === 'hostile'));
    document.querySelectorAll('.pill[data-wtype]').forEach(c => c.classList.toggle('active', c.dataset.wtype === 'gun'));
    document.querySelectorAll('.pill[data-auto]').forEach(c => c.classList.toggle('active', c.dataset.auto === 'auto'));
    resetSimplePills();

    const pc = $('preview-code'); if (pc) pc.textContent = 'Set a name, press Generate.';
    const pp = $('preview-path'); if (pp) pp.textContent = 'addons/...';
    const pcl = $('preview-class'); if (pcl) pcl.textContent = '--';
    const st = $('preview-status'); if (st) { st.textContent = 'idle'; st.style.color = ''; }
    ['download-btn','download-lua-btn','copy-btn','copy-path-btn','preview-copy-btn'].forEach(id => {
        const el = $(id); if (el) el.disabled = true;
    });
    updateSpawnPanel();
    setMode(false);
    updateCreditPreview();
    if (!silent) toast('Form cleared', 'info');
}

let modelBrowseTarget = 'model';
function renderModelBrowser(filter) {
    const body = $('model-browser-body'); if (!body) return;
    body.innerHTML = '';
    const lower = (filter || '').toLowerCase();
    for (const cat in MODEL_CATALOG) {
        const matched = MODEL_CATALOG[cat].filter(p => lower === '' || p.toLowerCase().includes(lower));
        if (matched.length === 0) continue;
        const h = document.createElement('h4'); h.textContent = cat;
        body.appendChild(h);
        const list = document.createElement('div'); list.className = 'model-list';
        matched.forEach(p => {
            const b = document.createElement('button');
            b.type = 'button'; b.className = 'model-list-item'; b.textContent = p;
            b.addEventListener('click', () => {
                const m = $(modelBrowseTarget) || $('model');
                if (m) m.value = p;
                const mb = $('model-browser'); if (mb) mb.hidden = true;
                updateSummary();
            });
            list.appendChild(b);
        });
        body.appendChild(list);
    }
}

function openModelBrowser(target) {
    modelBrowseTarget = target || 'model';
    const s = $('model-search'); if (s) s.value = '';
    renderModelBrowser('');
    const m = $('model-browser'); if (m) m.hidden = false;
    setTimeout(() => { if (s) s.focus(); }, 50);
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const b = $('theme-btn');
    if (b) b.textContent = state.theme === 'dark' ? 'Light' : 'Dark';
    document.querySelectorAll('.pill[data-theme-set]').forEach(p => p.classList.toggle('active', p.dataset.themeSet === state.theme));
}

function copyText(text, okMsg) {
    const done = () => toast(okMsg || 'Copied', 'success');
    const fallback = () => {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) done();
            else toast('Copy failed', 'error');
        } catch (e) { toast('Copy failed', 'error'); }
    };
    if (navigator.clipboard && window.isSecureContext !== false) {
        navigator.clipboard.writeText(text).then(done).catch(fallback);
    } else fallback();
}

document.querySelectorAll('.type-card').forEach(el => el.addEventListener('click', () => {
    document.querySelectorAll('.type-card').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.type = el.dataset.type;
    updateFields();
}));

document.querySelectorAll('.pill[data-base]').forEach(el => el.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-base]').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.base = el.dataset.base;
    updateFields();
}));

document.querySelectorAll('.pill[data-behavior]').forEach(el => el.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-behavior]').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.behavior = el.dataset.behavior;
    updateFields();
}));

document.querySelectorAll('.pill[data-disp]').forEach(el => el.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-disp]').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.disposition = el.dataset.disp;
    updateFields();
}));

document.querySelectorAll('.pill[data-wtype]').forEach(el => el.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-wtype]').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.weaponType = el.dataset.wtype;
    updateFields();
}));

document.querySelectorAll('.pill[data-auto]').forEach(el => el.addEventListener('click', () => {
    document.querySelectorAll('.pill[data-auto]').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    state.automatic = el.dataset.auto;
    updateFields();
}));

document.querySelectorAll('.pill[data-simple]').forEach(el => el.addEventListener('click', () => applySimple(el.dataset.simple)));

document.querySelectorAll('.pill[data-sfaction]').forEach(el => el.addEventListener('click', () => applySimpleFaction(el.dataset.sfaction)));

['s_health','s_damage','s_walk','s_run','s_wdamage','s_firedelay','s_clip'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', () => {
        const groups = { s_health: 'tough', s_damage: 'tough', s_wdamage: 'power', s_walk: 'speed', s_run: 'speed', s_firedelay: 'rate', s_clip: null };
        const g = groups[id];
        if (g) document.querySelectorAll('.pill[data-simple^="' + g + '"]').forEach(p => p.classList.remove('active'));
        pushSimpleStatsToAdvanced();
    });
});

const mSimple = $('mode-simple');
if (mSimple) mSimple.addEventListener('click', () => setMode(false));
const mAdv = $('mode-advanced');
if (mAdv) mAdv.addEventListener('click', () => setMode(true));

document.querySelectorAll('.preset').forEach(el => el.addEventListener('click', () => {
    const p = PRESETS[el.dataset.preset];
    if (p) { applyPreset(p); toast('Loaded preset: ' + el.textContent, 'success'); }
}));

document.querySelectorAll('.quick').forEach(el => el.addEventListener('click', () => {
    const t = el.dataset.target, v = el.dataset.value;
    const f = $(t); if (f) f.value = v;
    updateSummary();
}));

const mb = $('model-browse');
if (mb) mb.addEventListener('click', () => openModelBrowser('model'));

document.querySelectorAll('[data-browse]').forEach(btn => btn.addEventListener('click', () => openModelBrowser(btn.dataset.browse)));

const ms = $('model-search');
if (ms) ms.addEventListener('input', e => renderModelBrowser(e.target.value));

const mbc = $('model-browser-close');
if (mbc) mbc.addEventListener('click', () => { const m = $('model-browser'); if (m) m.hidden = true; });

const mbb = $('model-browser');
if (mbb) mbb.addEventListener('click', e => { if (e.target === mbb) mbb.hidden = true; });

const sl = $('settings-link');
if (sl) sl.addEventListener('click', () => { const m = $('settings-modal'); if (m) m.hidden = false; });

const sc = $('settings-close');
if (sc) sc.addEventListener('click', () => { const m = $('settings-modal'); if (m) m.hidden = true; });

const sm = $('settings-modal');
if (sm) sm.addEventListener('click', e => { if (e.target === sm) sm.hidden = true; });

document.querySelectorAll('.pill[data-theme-set]').forEach(el => el.addEventListener('click', () => {
    state.theme = el.dataset.themeSet;
    applyTheme();
}));

const ab = $('about-link');
if (ab) ab.addEventListener('click', () => { const m = $('about-modal'); if (m) m.hidden = false; });

const abc = $('about-close');
if (abc) abc.addEventListener('click', () => { const m = $('about-modal'); if (m) m.hidden = true; });

const abm = $('about-modal');
if (abm) abm.addEventListener('click', e => { if (e.target === abm) abm.hidden = true; });

const rl = $('reset-link');
if (rl) rl.addEventListener('click', clearForm);

const tb = $('theme-btn');
if (tb) tb.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
});

const gb = $('generate-btn');
if (gb) gb.addEventListener('click', generate);

const db = $('download-btn');
if (db) db.addEventListener('click', downloadZip);

const dl = $('download-lua-btn');
if (dl) dl.addEventListener('click', downloadLua);

const cb = $('copy-btn');
if (cb) cb.addEventListener('click', copyLua);

const cpb = $('copy-path-btn');
if (cpb) cpb.addEventListener('click', copyPath);

const pcb = $('preview-copy-btn');
if (pcb) pcb.addEventListener('click', copyLua);

const scb = $('spawn-copy-btn');
if (scb) scb.addEventListener('click', () => {
    const el = $('spawn-code'); if (!el) return;
    copyText(el.textContent, 'Command copied');
});

const wt = $('wrap-toggle');
if (wt) wt.addEventListener('change', () => {
    const c = $('preview-code'); if (c) c.classList.toggle('wrapped', wt.checked);
});

const cr = $('credit');
if (cr) { cr.addEventListener('input', () => { updateCreditPreview(); updateSummary(); }); }

const en = $('ent_name');
if (en) en.addEventListener('input', updateSummary);

const pn = $('print_name');
if (pn) pn.addEventListener('input', updateSummary);

const an = $('addon_name');
if (an) an.addEventListener('input', updateSummary);


document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        ['model-browser', 'about-modal', 'settings-modal'].forEach(id => { const el = $(id); if (el) el.hidden = true; });
        return;
    }
    if (e.ctrlKey && e.key === 'Enter') { e.preventDefault(); generate(); }
});

const FIXED_FOLDER_KEY = 'xac-fixed-folder';
function loadFixedFolder() {
    try {
        const raw = localStorage.getItem(FIXED_FOLDER_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        const t = document.getElementById('fixed-folder-toggle');
        const n = document.getElementById('fixed-folder-name');
        const f = document.getElementById('fixed-folder-field');
        if (t) t.checked = !!data.on;
        if (n) n.value = data.name || '';
        if (f) f.hidden = !data.on;
    } catch (e) {}
}
function saveFixedFolder() {
    const t = document.getElementById('fixed-folder-toggle');
    const n = document.getElementById('fixed-folder-name');
    try {
        localStorage.setItem(FIXED_FOLDER_KEY, JSON.stringify({
            on: t ? t.checked : false,
            name: n ? n.value.trim() : ''
        }));
    } catch (e) {}
}
function fixedFolderOn() {
    const t = document.getElementById('fixed-folder-toggle');
    const n = document.getElementById('fixed-folder-name');
    if (!t || !t.checked) return null;
    const v = n && n.value.trim();
    if (!v) return null;
    return v.toLowerCase().replace(/[^a-z0-9_]/g, '_');
}
const fft = document.getElementById('fixed-folder-toggle');
if (fft) fft.addEventListener('change', () => {
    const f = document.getElementById('fixed-folder-field');
    if (f) f.hidden = !fft.checked;
    saveFixedFolder();
    updateSummary();
});
const ffn = document.getElementById('fixed-folder-name');
if (ffn) ffn.addEventListener('input', () => { saveFixedFolder(); updateSummary(); });

loadFixedFolder();
applyTheme();
updateCreditPreview();
state.advanced = false;
clearForm(true);
window.addEventListener('pageshow', (e) => { if (e.persisted) clearForm(true); });
