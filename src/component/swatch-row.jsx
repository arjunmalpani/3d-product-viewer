export default function SwatchRow({ label, colors, value, onChange }) {
    return (
        <div>
            <p className="text-sm text-white/70 mb-2">{label}</p>
            <div className="flex gap-2">
                {colors.map((c) => (
                    <button
                        key={c.name}
                        onClick={() => onChange(c.hex)}
                        title={c.name}
                        style={{ background: c.hex }}
                        className={`h-10 w-10 rounded-full ring-2 ${
                            value === c.hex
                                ? "ring-white/60 scale-110"
                                : "ring-transparent"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
