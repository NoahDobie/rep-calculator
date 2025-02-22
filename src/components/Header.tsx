function Header() {
  return (
    <header className="w-full py-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        <a
          href="https://github.com/NoahDobie/"
          className="transition duration-300 hover:text-red-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          Noah's
        </a>
        {' '}1 Rep Max Calculator
      </h1>
    </header>
  );
}

export default Header;