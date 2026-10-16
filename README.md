Xero's Addon Creator

Generate Garry's Mod SWEPs and NPCs in your browser.

Created by XeroChunks, a Garry's Mod developer.

The problem

If you have ever tried to make your first GMod addon, you know how it goes. You open the wiki, it tells you what a SWEP is. It does not give you a template that spawns without errors.

The community forums are full of the same questions. "What's a good place to start learning Lua and making addons?" gets answered with "addon making is a tedious task at first" and "you need patience". A thread titled "How do I make a gmod addon" gets a 500-word lecture about professionalism instead of a working example.

When someone does post broken code, the responses are brutal. A Reddit thread tearing apart a SWEP points out a PrimaryAttack function that was never closed, a DealDamage function defined inside it, and a damage check that used an invalid enum. That post got a detailed critique. It did not get a fix.

The wiki lists every SWEP function and every NPC method. It does not give you something you can drop into a folder and spawn.

What this does

Pick your base. Fill in the fields. Download the Lua. The boilerplate is already written. The end statements are closed. The enums are valid. The folder structure is correct. It runs on the first try, or it tells you why it won't.

Everything runs client-side. No server, no accounts. Download a zip, drop it into garrysmod/, restart the game, and it is in the spawn menu.

What it makes

  NPCs
    DrGBase nextbot (npc_drg_<name>_nextbot.lua)
    base_nextbot (npc_<name>_nextbot.lua)
    308 / x308 (npc_308_<name>.lua)
    Behaviors: Passive, Melee, Ranged, Melee + Ranged
    Faction, disposition, hostile-to, friendly-to
    Trace-based ranged projectile with exact damage
    No physics crush, no one-shots

  SWEPs
    Gun: hitscan, clip ammo, reload
    Melee: eye-trace swing with exact damage
    Dual: visible world models on both hands
    Tool: custom toolgun with direct damage
    Clip size, ammo type, fire delay, automatic toggle
    Animation overrides via ACT_ enums or custom sequence names

Requirements

  DrGBase (Workshop) for DrGBase NPCs
  308 Base (Workshop) for 308 NPCs and 308-style SWEPs
  x308 Base (Workshop) for the fixed fork of 308
  No requirements for base_nextbot NPCs or standalone SWEPs

How to use

  1. Pick a type (NPC or Weapon)
  2. Pick a base framework if you picked NPC
  3. Fill in the fields. The class name updates live
  4. Click Generate to preview the Lua
  5. Download .lua for a single file, or zip for a full addon
  6. Drop into garrysmod/ and restart the game

If the site is blocked or you prefer to run it locally

  Download the repository as a zip, extract it, and open index.html in your browser. No build step, no npm install, no dependencies beyond the JSZip CDN.

Adding a new template

  Open templates.js and add a key. Use [PLACEHOLDER] tokens:
    [PRINT_NAME]  [CREDIT]  [ADDON_NAME]  [MODEL]
    [WMODEL]      [VMODEL]  [HEALTH]      [WALK_SPEED]
    [RUN_SPEED]   [DAMAGE]  [CLIP_SIZE]   [AMMO_TYPE]
    [FIRE_DELAY]  [FACTIONS_TABLE]        [RELATIONSHIP_BLOCK]

  Then add a matching entry to NAME_PATTERNS and DEFAULT_MODELS in script.js.

Contributing

  Issues and pull requests welcome. Keep it dependency-free. If you add a template, keep it small, tested, and free of framework assumptions beyond what the base provides.

Created by XeroChunks
Garry's Mod developer
https://steamcommunity.com/id/xerochunks/
