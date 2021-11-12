/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const listInterface = [
  { id: '1', title: 'eth0' },
  { id: '2', title: 'eth1' },
  { id: '3', title: 'eth2' },
  { id: '4', title: 'eth3' },
];

export default function RadioInterface() {
  return (
    <fieldset className="space-y-5">
      <legend className="text-sm leading-5 text-gray-500">
        Pilih Interface yang akan dihapus !
      </legend>
      {listInterface.map((item) => (
        <div key={item.id} className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="comments"
              aria-describedby="comments-description"
              name="comments"
              type="checkbox"
              className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="comments" className="font-medium text-gray-700">
              {item.title}
            </label>
          </div>
        </div>
      ))}

      <div>
        <button className="bg-red-500 hover:bg-red-700 focus:bg-red-700 transition-all duration-300 px-4 py-2 rounded-md text-white font-medium text-sm">
          Delete Interface
        </button>
      </div>
    </fieldset>
  );
}
