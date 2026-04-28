import { getDishes } from "../../../lib/actions/menu";
import Image from "next/image";
import Pagination from "../blog/pagination";

export type Params = {
  category?: string;
  product?: string;
  page?: string;
  amountPerPage: number;
};

export default async function MenuList({
  category,
  product,
  page,
  amountPerPage,
}: Params) {
  const { dishes, total } = await getDishes({
    category,
    product,
    page,
    amountPerPage,
  });

  //console.log("dfsfds");
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-2 mx-6">
        {dishes.map((elem, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md w-full flex flex-col h-full min-h-[320px] max-h-[600px] p-4"
          >
            {/* Картинка */}
            <div className="relative w-full aspect-[16/9] mb-3">
              <Image
                src={elem.image!}
                alt={elem.name || "Dish"}
                fill
                priority
                className="object-cover rounded-t-lg"
              />
            </div>

            <h2 className="text-lg font-semibold mb-2">{elem.name}</h2>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {elem.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {elem.products?.map((product) => (
                <span
                  key={product.id}
                  className="flex items-center bg-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {product.image && (
                    <div className="relative w-5 h-5 rounded-full overflow-hidden mr-2 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {product.name}
                </span>
              ))}
            </div>

            {/* Кнопка "Добавить" */}
            {/* <button
            className="mt-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            // onClick={() => ...} // обработчик добавления
          >
            Добавить
          </button> */}
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center mt-8 mb-4">
        {total > 1 && <Pagination total={total} scrollLabel="_MENU" />}
      </div>
    </>
  );
}
