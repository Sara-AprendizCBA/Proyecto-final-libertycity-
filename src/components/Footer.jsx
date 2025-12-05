export default function Footer() {
  return (

    <footer className="mt-10 pt-6 border-t">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">© {new Date().getFullYear()} libertycity — Todos los derechis reservados</div>
        <div className="flex items-center gap-4 text-gray-600">
            <a className="hover:text-red-900" href="#" aria-label="Twitter"><i className="fab fa-twitter" aria-hidden="true"></i></a>
            <a className="hover:text-gray-900" href="#" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
            <a className="hover:text-gray-900" href="#" aria-label="Github"><i className="fab fa-github" aria-hidden="true"></i></a>
            <a className="hover:text-gray-900" href="#" aria-label="YouTube"><i className="fab fa-youtube" aria-hidden="true"></i></a>
        </div>
      </div>
    </footer>
  )
}
