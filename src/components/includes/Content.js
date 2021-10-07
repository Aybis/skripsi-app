export default function Content({ title, children }) {
  return (
    <main className="flex-1 relative overflow-y-auto focus:outline-none">
      <div className="py-6 h-auto max-h-full">
        <div className="px-4 sm:px-6 md:px-0">
          <h1 className="text-3xl tracking-wide uppercase font-bold text-gray-900">
            {title}
          </h1>
        </div>
        <div className="px-4 sm:px-6 md:px-0 overflow-y-auto">
          {/* Replace with your content */}
          <div className="py-4">
            <div className="relative rounded-lg">{children}</div>
          </div>
          {/* /End replace */}
        </div>
      </div>
    </main>
  );
}
