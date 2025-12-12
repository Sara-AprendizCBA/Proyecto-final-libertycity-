import BookCard from './BookCard'

export default function BookGrid({ libros }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white dark:bg-slate-900 rounded-xl p-4">
      {libros.map((libro) => (
        <BookCard key={libro.id} libro={libro} />
      ))}
    </section>
  )
}
