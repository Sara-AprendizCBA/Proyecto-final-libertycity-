export default function BookDetail({ libro, onClose }) {
    if (!libro) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">

            {/* CERRAR */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-2xl"
            >
                ✕
            </button>

            <div className="max-w-6xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* PORTADA */}
                <div className="flex justify-center">
                    <img
                        src={libro.portada || "https://via.placeholder.com/300x450"}
                        alt={libro.titulo}
                        className="rounded-xl shadow-xl w-72"
                    />
                </div>

                {/* INFO */}
                <div className="md:col-span-2 space-y-6">

                    <h1 className="text-4xl font-bold">
                        {libro.titulo}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                        <span>👁 Lecturas: {libro.lecturas || "—"}</span>
                        <span>⭐ Votos: {libro.votos || "—"}</span>
                        <span>📖 Partes: {libro.partes || "—"}</span>
                        <span>⏱ {libro.duracion || "—"}</span>
                    </div>

                    {/* BOTONES */}
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-8 py-3 rounded-full flex items-center gap-2">
                            📖 Empezar a leer
                        </button>
                        <button className="w-12 h-12 rounded-full border flex items-center justify-center text-xl">
                            +
                        </button>
                    </div>

                    {/* AUTOR */}
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold">
                            {libro.autor?.charAt(0) || "A"}
                        </div>
                        <span className="font-medium">
                            {libro.autor || "Autor desconocido"}
                        </span>
                    </div>

                    {/* DESCRIPCIÓN */}
                    <p className="text-gray-700 leading-relaxed">
                        {libro.descripcion || "Sin descripción disponible."}
                    </p>

                    {/* TAGS */}
                    <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                            Dominio público
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                            {libro.categoria}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
