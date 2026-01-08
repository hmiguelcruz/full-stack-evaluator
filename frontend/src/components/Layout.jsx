import UserSelect from './UserSelect';

export default function Layout({ children }) {
  return (
    <>
      <header className="flex justify-center items-center text-center bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 gap-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📝</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Task Evaluator
            </h1>
          </div>
          <UserSelect />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
}
