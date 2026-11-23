import { useState } from 'react';
import { useI18n } from '../i18n';
import { MappingPreset } from '../hooks/useScrcpy';
import { Plus } from 'lucide-react';

interface MappingPanelProps {
    presets: MappingPreset[];
    setPresets: (presets: MappingPreset[]) => void;
    activePreset: MappingPreset | null;
    setActivePreset: (preset: MappingPreset | null) => void;
}

const DEFAULT_PRESET: MappingPreset = {
    name: '',
    authored_for: [1920, 1080],
    sensitivity: {
        aim: 1,
        ads: 1.1,
        scope_curve: 'exponential',
    },
    anchors: [],
    movement: {
        type: 'virtual_joystick',
        origin: [0.1762, 0.7546],
        keys: {
            up: 'w',
            down: 's',
            left: 'a',
            right: 'd',
        },
    },
    aim: {
        type: 'relative_swipe',
        mouse: true,
    },
};

export default function MappingPanel({ presets, setPresets, activePreset, setActivePreset }: MappingPanelProps) {
    const { t } = useI18n();
    const [editing, setEditing] = useState(false);
    const [newPreset, setNewPreset] = useState<MappingPreset>(...DEFAULT_PRESET);

    const handleSave = () => {
        setPresets([...presets, newPreset]);
        setActivePreset(null);
        setEditing(false);
    };

    return (
        <div className="glass p-3.5 rounded-2xl space-y-2 border border-zinc-800 bg-zinc-900/40 backdrop-blur-md max-w-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800/50 pb-1.5">
                <h2 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{t('mapping.title')}</h2>
            </div>

            <div className="h-64 overflow-y-auto space-y-1">
                {presets.map((preset) => (
                    <div
                        key={preset.name}
                        onClick={() => setActivePreset(preset)}
                        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-zinc-800/50 transition-colors cursor-pointer {activePreset?.name === preset.name ? 'bg-primary/20' : ''}"
                    >
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{preset.name}</span>
                    </div>
                ))}
            </div>

            {editing && (
                <div className="mt-2 p-3 rounded border border-zinc-800/50 bg-zinc-950">
                    <h3 className="text-[9px] font-black uppercase text-zinc-400 mb-2">{t('mapping.newPreset')}</h3>
                    <input
                        placeholder={t('mapping.presetName')}
                        value={newPreset.name}
                        onChange={(e) => setNewPreset({ ...newPreset, name: e.target.value })}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-2 py-1 text-[10px] text-zinc-300 focus:border-primary/60 focus:outline-none"
                    />
                    <button
                        onClick={() => setEditing(false)}
                        className="mt-2 py-1 px-2 text-[9px] font-black uppercase text-primary hover:bg-primary/20 rounded transition-colors"
                    >
                        {t('mapping.cancel')}
                    </button>
                    <button
                        onClick={handleSave}
                        className="mt-2 w-full py-1 px-2 text-[9px] font-black uppercase bg-primary text-white rounded transition-colors"
                    >
                        {t('mapping.save')}
                    </button>
                </div>
            )}

            <button
                onClick={() => setEditing(true)}
                className="w-full py-2 rounded-2xl text-base font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden group active:scale-[0.98] bg-primary/10 hover:bg-primary/20"
            >
                <span className="relative z-10 flex items-center justify-center gap-3 text-primary">
                    <Plus fill="currentColor" size={14} className="group-hover:scale-110 transition-transform" />
                    {t('mapping.addPreset')}
                </span>
            </button>

            {activePreset && (
                <div className="mt-2 p-3 rounded border border-zinc-800/50 bg-zinc-950">
                    <h3 className="text-[9px] font-black uppercase text-zinc-400 mb-2">{t('mapping.presetDetails', { name: activePreset.name })}</h3>
                    <p>{t('mapping.presetAuthoredFor', { w: activePreset.authored_for[0], h: activePreset.authored_for[1] })}</p>
                </div>
            )}
        </div>
    );
}