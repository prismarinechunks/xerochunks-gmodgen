const TEMPLATES = {
npc_drgbase: `AddCSLuaFile()

ENT.Type = "nextbot"
ENT.Base = "drgbase_nextbot"
ENT.PrintName = "[PRINT_NAME]"
ENT.Author = "[CREDIT]"
ENT.Category = "[ADDON_NAME]"
ENT.Spawnable = true
ENT.AdminOnly = false

ENT.Models = [MODELS_TABLE]
ENT.SpawnHealth = [HEALTH]
ENT.WalkSpeed = [WALK_SPEED]
ENT.RunSpeed = [RUN_SPEED]

ENT.Factions = [FACTIONS_TABLE]
ENT.DefaultRelationship = D_NU

ENT.BloodColor = BLOOD_COLOR_RED
ENT.BloodDecal = "Blood"

ENT.RangeAttackRange = [RANGE_ATTACK_RANGE]
ENT.MeleeAttackRange = [MELEE_ATTACK_RANGE]
ENT.ReachEnemyRange = [REACH_ENEMY_RANGE]
ENT.AvoidEnemyRange = [AVOID_ENEMY_RANGE]
ENT.MeleeDamage = [DAMAGE]
ENT.MeleeCooldown = [MELEE_COOLDOWN]
ENT.ShotDelay = [SHOT_DELAY]
ENT.MeleeForce = 1000
ENT.AttackSound = "[NPC_ATTACK_SOUND]"
ENT.ProjectileImpactSound = "[NPC_PROJECTILE_SOUND]"

[PROJECTILE_FIELDS]
[NPC_ANIMATIONS]

if SERVER then
    function ENT:CustomInitialize()
[RELATIONSHIP_BLOCK]
    end
[MELEE_BLOCK]
[RANGED_BLOCK]
end

if DrGBase and DrGBase.AddNextbot then
    DrGBase.AddNextbot(ENT)
end
`,
npc_nextbot: `AddCSLuaFile()

ENT.Base = "base_nextbot"
ENT.Type = "nextbot"
ENT.PrintName = "[PRINT_NAME]"
ENT.Author = "[CREDIT]"
ENT.Category = "[ADDON_NAME]"
ENT.Spawnable = true
ENT.AdminOnly = false

ENT.Models = [MODELS_TABLE]
ENT.SpawnHealth = [HEALTH]
ENT.MeleeCooldown = [MELEE_COOLDOWN]
ENT.AttackSound = "[NPC_ATTACK_SOUND]"
ENT.BloodColor = BLOOD_COLOR_RED

if SERVER then
    local ai_ignoreplayers = GetConVar("ai_ignoreplayers")
    local ai_disabled = GetConVar("ai_disabled")

    local function isValidTarget(self, ent)
        if not IsValid(ent) or ent == self then return false end
        if ent:IsPlayer() then
            if ai_ignoreplayers:GetBool() then return false end
            return ent:Alive()
        end
        if ent:IsNextBot() then return true end
        return ent:IsNPC() and ent:Health() > 0
    end

    function ENT:Initialize()
        self:SetModel(self.Models[math.random(#self.Models)])
        self:SetHealth([HEALTH])
        self:SetMaxHealth([HEALTH])
        self:SetCollisionBounds(Vector(-13, -13, 0), Vector(13, 13, 72))
        self.loco:SetDesiredSpeed([RUN_SPEED])
        self.loco:SetAcceleration(1000)
        self.loco:SetDeceleration(700)
        self.loco:SetJumpHeight(300)
        self.loco:SetDeathDropHeight(600)
        self.LastTargetSearch = 0
        self.LastPathRecompute = 0
        self.LastAttack = 0
        self.CurrentTarget = nil
    end

    function ENT:GetNearestTarget()
        local myPos = self:GetPos()
        local best, bestDist
        for _, ent in ipairs(ents.FindInSphere(myPos, 5000)) do
            if isValidTarget(self, ent) then
                local d = myPos:DistToSqr(ent:GetPos())
                if not bestDist or d < bestDist then best = ent; bestDist = d end
            end
        end
        return best
    end

    function ENT:AttackNearbyTargets()
        local hitSource = self:LocalToWorld(self:OBBCenter())
        for _, ent in ipairs(ents.FindInSphere(hitSource, [MELEE_ATTACK_RANGE])) do
            if isValidTarget(self, ent) then
                if self.AttackSound and self.AttackSound ~= "" then
                    self:EmitSound(self.AttackSound)
                end
                local dir = (ent:GetPos() - hitSource):GetNormalized()
                local dmg = DamageInfo()
                dmg:SetAttacker(self)
                dmg:SetInflictor(self)
                dmg:SetDamage([DAMAGE])
                dmg:SetDamageType(DMG_SLASH)
                dmg:SetDamageForce(dir * 800)
                ent:TakeDamageInfo(dmg)
            end
        end
    end

    function ENT:RecomputeTargetPath()
        if not IsValid(self.CurrentTarget) then return end
        local targetPos = self.CurrentTarget:GetPos()
        local tr = util.TraceLine({
            start = targetPos,
            endpos = targetPos - Vector(0, 0, 16384),
            filter = self.CurrentTarget,
            mask = MASK_SOLID_BRUSHONLY
        })
        if tr.Hit and util.IsInWorld(tr.HitPos) then targetPos = tr.HitPos end
        if not util.IsInWorld(targetPos) then return end
        self.MovePath:Compute(self, targetPos)
    end

    function ENT:BehaveStart()
        self.MovePath = Path("Follow")
        self.MovePath:SetMinLookAheadDistance(500)
        self.MovePath:SetGoalTolerance(10)
    end

    function ENT:BehaveUpdate()
        if ai_disabled:GetBool() then return end
        local t = CurTime()
        if t - self.LastTargetSearch > 1 then
            local target = self:GetNearestTarget()
            if target ~= self.CurrentTarget then self.LastPathRecompute = 0 end
            self.CurrentTarget = target
            self.LastTargetSearch = t
        end
        if IsValid(self.CurrentTarget) then
            local cooldown = tonumber(self.MeleeCooldown) or 0.5
            if t - self.LastAttack > cooldown then
                self:AttackNearbyTargets()
                self.LastAttack = t
            end
            if t - self.LastPathRecompute > 0.1 then
                self.LastPathRecompute = t
                self:RecomputeTargetPath()
            end
            self.MovePath:Update(self)
        end
    end

    function ENT:OnStuck()
        self.loco:ClearStuck()
    end
end
`,
npc_308: `AddCSLuaFile()

ENT.Base = "npc_308_man"
ENT.PrintName = "[PRINT_NAME]"
ENT.Author = "[CREDIT]"
ENT.Category = "[ADDON_NAME]"
ENT.HP = [HEALTH]
ENT.StartSpeed = [WALK_SPEED]
ENT.Model = "[MODEL]"
ENT.Factions = [FACTIONS_TABLE]
ENT.DefaultRelationship = D_NU
ENT.AttackSound = "[NPC_ATTACK_SOUND]"
ENT.ShotDelay = [SHOT_DELAY]

ENT.AttRange = [MELEE_ATTACK_RANGE]
ENT.AttRange2 = [RANGE_ATTACK_RANGE]
ENT.AttFaceTo = true
ENT.RA_Dmg = [DAMAGE]
ENT.Ammo = 12

if SERVER then
    function ENT:CustomInit()
[RELATIONSHIP_BLOCK]
    end

    function ENT:Attack()
        if not IsValid(self:GetEnemy()) then return end
        if [HAS_RANGED_BOOL] and self:GetRangeTo(self:GetEnemy()) > 200 then
            self:RangeAtt()
        else
            if self.AttackSound and self.AttackSound ~= "" then
                self:EmitSound(self.AttackSound)
            end
            self:Melee({
                { Range = [MELEE_ATTACK_RANGE], dmg = [DAMAGE], Time = 0.4, SHit = "Flesh.ImpactHard", SMiss = "WeaponFrag.Throw" }
            })
        end
    end

    function ENT:RangeAtt()
        if not IsValid(self:GetEnemy()) then return end
        if self.NextShot and CurTime() < self.NextShot then return end
        self.NextShot = CurTime() + (self.ShotDelay or 1.0)
        if self.Ammo and self.Ammo < 1 then
            self.Ammo = 12
            return
        end
        if self.Ammo then self.Ammo = self.Ammo - 1 end
        if self.AttackSound and self.AttackSound ~= "" then
            self:EmitSound(self.AttackSound)
        end
        if self.LookupSequence and self.SEQ then
            local seq = self:LookupSequence("shootgun2")
            if seq and seq > 0 then self:SEQ("shootgun2") end
        end
        self.Timer = CurTime() + 0.7
        if self.FireB then self:FireB() end
    end
end

function ENT:OnHurt(d, h) end
function ENT:OnDead(d) end

if Add308Nextbot then
    Add308Nextbot(ENT)
end
`,
weapon_gun: `AddCSLuaFile()

SWEP.Base = "weapon_base"
SWEP.PrintName = "[PRINT_NAME]"
SWEP.Author = "[CREDIT]"
SWEP.Category = "[ADDON_NAME]"
SWEP.Spawnable = true
SWEP.AdminOnly = false
SWEP.Slot = 2
SWEP.SlotPos = 0
SWEP.Instructions = "Left click to fire."
SWEP.Purpose = "Standard firearm."
SWEP.HoldType = "ar2"
SWEP.UseHands = true
SWEP.ViewModelFOV = [VMODEL_FOV]
SWEP.BobScale = 1
SWEP.SwayScale = 1
SWEP.ViewModel = "[VMODEL]"
SWEP.WorldModel = "[WMODEL]"
SWEP.Primary.ClipSize = [CLIP_SIZE]
SWEP.Primary.DefaultClip = [CLIP_SIZE]
SWEP.Primary.Automatic = [AUTOMATIC]
SWEP.Primary.Ammo = "[AMMO_TYPE]"
SWEP.Secondary.ClipSize = -1
SWEP.Secondary.DefaultClip = -1
SWEP.Secondary.Automatic = false
SWEP.Secondary.Ammo = "none"
SWEP.FireDelay = [FIRE_DELAY]
SWEP.FireSound = "[FIRE_SOUND]"
SWEP.ReloadSound = "[RELOAD_SOUND]"

[WEAPON_ANIMATIONS]

local function XAC_PlayAct(self, act, fallback)
    if act ~= nil and type(act) == "number" then
        self:SendWeaponAnim(act)
    else
        self:SendWeaponAnim(fallback)
    end
end

function SWEP:Deploy()
    XAC_PlayAct(self, self.DrawAct, ACT_VM_DRAW)
    self:SetNextPrimaryFire(CurTime() + 0.3)
    return true
end

function SWEP:PrimaryAttack()
    if not self:CanPrimaryAttack() then return end
    self:SetNextPrimaryFire(CurTime() + self.FireDelay)
    local owner = self:GetOwner()
    if not IsValid(owner) then return end
    if self.FireSound and self.FireSound ~= "" then
        self:EmitSound(self.FireSound)
    end
    if self.Primary.ClipSize and self.Primary.ClipSize > 0 then
        self:TakePrimaryAmmo(1)
    end
    owner:LagCompensation(true)
    local bullet = {}
    bullet.Num = 1
    bullet.Src = owner:GetShootPos()
    bullet.Dir = owner:GetAimVector()
    bullet.Spread = Vector(0.02, 0.02, 0)
    bullet.Tracer = 1
    bullet.TracerName = "Tracer"
    bullet.Force = 5
    bullet.Damage = [DAMAGE]
    bullet.AmmoType = self.Primary.Ammo or "Pistol"
    owner:FireBullets(bullet)
    owner:ViewPunch(Angle(-1, 0, 0))
    owner:LagCompensation(false)
    XAC_PlayAct(self, self.FireAct, ACT_VM_PRIMARYATTACK)
    if self.Primary.ClipSize and self.Primary.ClipSize > 0 and self:Clip1() <= 0 then
        self:Reload()
    end
end

function SWEP:Reload()
    if not self.Primary.ClipSize or self.Primary.ClipSize <= 0 then return end
    if self:Clip1() >= self.Primary.ClipSize then return end
    if self.ReloadSound and self.ReloadSound ~= "" then
        self:EmitSound(self.ReloadSound)
    end
    XAC_PlayAct(self, self.ReloadAct, ACT_VM_RELOAD)
    self:DefaultReload(ACT_VM_RELOAD)
end

function SWEP:SecondaryAttack() end
`,
weapon_melee: `AddCSLuaFile()

SWEP.Base = "weapon_base"
SWEP.PrintName = "[PRINT_NAME]"
SWEP.Author = "[CREDIT]"
SWEP.Category = "[ADDON_NAME]"
SWEP.Spawnable = true
SWEP.AdminOnly = false
SWEP.Slot = 0
SWEP.SlotPos = 0
SWEP.Instructions = "Left click to swing."
SWEP.Purpose = "Melee weapon."
SWEP.HoldType = "melee"
SWEP.UseHands = true
SWEP.ViewModelFOV = [VMODEL_FOV]
SWEP.BobScale = 1
SWEP.SwayScale = 1
SWEP.ViewModel = "[VMODEL]"
SWEP.WorldModel = "[WMODEL]"
SWEP.Primary.ClipSize = -1
SWEP.Primary.DefaultClip = -1
SWEP.Primary.Automatic = false
SWEP.Primary.Ammo = "none"
SWEP.Secondary.ClipSize = -1
SWEP.Secondary.DefaultClip = -1
SWEP.Secondary.Automatic = false
SWEP.Secondary.Ammo = "none"
SWEP.MeleeDamage = [DAMAGE]
SWEP.MeleeRange = [ATTACK_RANGE]
SWEP.MeleeDelay = [FIRE_DELAY]
SWEP.MeleeForce = 100
SWEP.MeleeSound = "[FIRE_SOUND]"

[WEAPON_ANIMATIONS]

local function XAC_PlayAct(self, act, fallback)
    if act ~= nil and type(act) == "number" then
        self:SendWeaponAnim(act)
    else
        self:SendWeaponAnim(fallback)
    end
end

function SWEP:Deploy()
    XAC_PlayAct(self, self.DrawAct, ACT_VM_DRAW)
    return true
end

function SWEP:PrimaryAttack()
    if not self:CanPrimaryAttack() then return end
    self:SetNextPrimaryFire(CurTime() + self.MeleeDelay)
    local owner = self:GetOwner()
    if not IsValid(owner) then return end
    XAC_PlayAct(self, self.FireAct, ACT_VM_HITCENTER)
    if self.MeleeSound and self.MeleeSound ~= "" then
        self:EmitSound(self.MeleeSound)
    end
    local tr = util.TraceLine({
        start = owner:GetShootPos(),
        endpos = owner:GetShootPos() + owner:GetAimVector() * self.MeleeRange,
        filter = owner,
        mask = MASK_SHOT
    })
    if not tr.Hit then return end
    local hit = tr.Entity
    if not IsValid(hit) then return end
    if hit == owner then return end
    local dmg = DamageInfo()
    dmg:SetDamage(self.MeleeDamage)
    dmg:SetDamageType(DMG_CLUB)
    dmg:SetAttacker(owner)
    dmg:SetInflictor(self)
    dmg:SetDamagePosition(tr.HitPos)
    dmg:SetDamageForce(owner:GetAimVector() * self.MeleeForce * 100)
    hit:TakeDamageInfo(dmg)
end

function SWEP:SecondaryAttack() end
`,
weapon_dual: `AddCSLuaFile()

SWEP.Base = "weapon_base"
SWEP.PrintName = "[PRINT_NAME]"
SWEP.Author = "[CREDIT]"
SWEP.Category = "[ADDON_NAME]"
SWEP.Spawnable = true
SWEP.AdminOnly = false
SWEP.Slot = 2
SWEP.SlotPos = 0
SWEP.Instructions = "Left click to fire."
SWEP.Purpose = "Dual-wielded pistols."
SWEP.HoldType = "duel"
SWEP.UseHands = true
SWEP.ViewModelFOV = [VMODEL_FOV]
SWEP.BobScale = 1
SWEP.SwayScale = 1
SWEP.ViewModel = "[VMODEL]"
SWEP.WorldModel = "[WMODEL]"
SWEP.Primary.ClipSize = [CLIP_SIZE]
SWEP.Primary.DefaultClip = [CLIP_SIZE]
SWEP.Primary.Automatic = [AUTOMATIC]
SWEP.Primary.Ammo = "[AMMO_TYPE]"
SWEP.Secondary.ClipSize = -1
SWEP.Secondary.DefaultClip = -1
SWEP.Secondary.Automatic = false
SWEP.Secondary.Ammo = "none"
SWEP.FireDelay = [FIRE_DELAY]
SWEP.FireSound = "[FIRE_SOUND]"
SWEP.ReloadSound = "[RELOAD_SOUND]"

[WEAPON_ANIMATIONS]

local function XAC_PlayAct(self, act, fallback)
    if act ~= nil and type(act) == "number" then
        self:SendWeaponAnim(act)
    else
        self:SendWeaponAnim(fallback)
    end
end

function SWEP:Deploy()
    XAC_PlayAct(self, self.DrawAct, ACT_VM_DRAW)
    self:SetNextPrimaryFire(CurTime() + 0.3)
    return true
end

function SWEP:PrimaryAttack()
    if not self:CanPrimaryAttack() then return end
    self:SetNextPrimaryFire(CurTime() + self.FireDelay)
    local owner = self:GetOwner()
    if not IsValid(owner) then return end
    if self.FireSound and self.FireSound ~= "" then
        self:EmitSound(self.FireSound)
    end
    if self.Primary.ClipSize and self.Primary.ClipSize > 0 then
        self:TakePrimaryAmmo(1)
    end
    owner:LagCompensation(true)
    local bullet = {}
    bullet.Num = 1
    bullet.Src = owner:GetShootPos()
    bullet.Dir = owner:GetAimVector()
    bullet.Spread = Vector(0.03, 0.03, 0)
    bullet.Tracer = 1
    bullet.TracerName = "Tracer"
    bullet.Force = 5
    bullet.Damage = [DAMAGE]
    bullet.AmmoType = self.Primary.Ammo or "Pistol"
    owner:FireBullets(bullet)
    owner:ViewPunch(Angle(-1, 0, 0))
    owner:LagCompensation(false)
    XAC_PlayAct(self, self.FireAct, ACT_VM_PRIMARYATTACK)
    if self.Primary.ClipSize and self.Primary.ClipSize > 0 and self:Clip1() <= 0 then
        self:Reload()
    end
end

function SWEP:Reload()
    if not self.Primary.ClipSize or self.Primary.ClipSize <= 0 then return end
    if self:Clip1() >= self.Primary.ClipSize then return end
    if self.ReloadSound and self.ReloadSound ~= "" then
        self:EmitSound(self.ReloadSound)
    end
    XAC_PlayAct(self, self.ReloadAct, ACT_VM_RELOAD)
    self:DefaultReload(ACT_VM_RELOAD)
end

function SWEP:SecondaryAttack() end
`,
weapon_tool: `AddCSLuaFile()

SWEP.Base = "weapon_base"
SWEP.PrintName = "[PRINT_NAME]"
SWEP.Author = "[CREDIT]"
SWEP.Category = "[ADDON_NAME]"
SWEP.Spawnable = true
SWEP.AdminOnly = false
SWEP.Slot = 4
SWEP.SlotPos = 0
SWEP.Instructions = "Left click to use."
SWEP.Purpose = "Custom tool."
SWEP.HoldType = "revolver"
SWEP.UseHands = true
SWEP.ViewModelFOV = [VMODEL_FOV]
SWEP.BobScale = 1
SWEP.SwayScale = 1
SWEP.ViewModel = "[VMODEL]"
SWEP.WorldModel = "[WMODEL]"
SWEP.Primary.ClipSize = -1
SWEP.Primary.DefaultClip = -1
SWEP.Primary.Automatic = true
SWEP.Primary.Ammo = "none"
SWEP.Secondary.ClipSize = -1
SWEP.Secondary.DefaultClip = -1
SWEP.Secondary.Automatic = false
SWEP.Secondary.Ammo = "none"
SWEP.FireDelay = [FIRE_DELAY]
SWEP.FireSound = "[FIRE_SOUND]"

[WEAPON_ANIMATIONS]

local function XAC_PlayAct(self, act, fallback)
    if act ~= nil and type(act) == "number" then
        self:SendWeaponAnim(act)
    else
        self:SendWeaponAnim(fallback)
    end
end

function SWEP:Deploy()
    XAC_PlayAct(self, self.DrawAct, ACT_VM_DRAW)
    self:SetNextPrimaryFire(CurTime() + 0.2)
    return true
end

function SWEP:PrimaryAttack()
    if not self:CanPrimaryAttack() then return end
    self:SetNextPrimaryFire(CurTime() + self.FireDelay)
    local owner = self:GetOwner()
    if not IsValid(owner) then return end
    local tr = owner:GetEyeTrace()
    if not tr.Hit then return end
    XAC_PlayAct(self, self.FireAct, ACT_VM_PRIMARYATTACK)
    if self.FireSound and self.FireSound ~= "" then
        self:EmitSound(self.FireSound)
    end
    local hit = tr.Entity
    if not IsValid(hit) then return end
    local dmg = DamageInfo()
    dmg:SetDamage([DAMAGE])
    dmg:SetDamageType(DMG_DIRECT)
    dmg:SetAttacker(owner)
    dmg:SetInflictor(self)
    dmg:SetDamagePosition(tr.HitPos)
    hit:TakeDamageInfo(dmg)
end

function SWEP:SecondaryAttack() end
`
};
