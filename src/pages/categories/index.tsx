import React, { useState } from "react";
import { getFakeCategories } from "~/utils/api";

const CategoryList: React.FC = () => {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const categories = getFakeCategories(100);

  // Calculate the start and end indexes for the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentCategories = categories.slice(startIndex, endIndex);

  // State to store selected category IDs
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Function to handle page navigation based on page number
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(categories.length / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToDoublePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(Math.max(currentPage - 5, 1));
    }
  };

  const goToDoubleNext = () => {
    const totalPages = Math.ceil(categories.length / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(Math.min(currentPage + 5, totalPages));
    }
  };

  const renderCategories = () => {
    return currentCategories.map((category) => (
      <li className="my-3" key={category.id}>
        <label>
          <input
          className="text-black"
            type="checkbox"
            // checked={selectedCategories.includes(category.id)}
            // onChange={() => toggleCategorySelection(category.id)}
          />
          <span className="ml-2">{category.name}</span>
        </label>
      </li>
    ));
  };

  const totalPages = Math.ceil(categories.length / pageSize);
  const renderPagination = () => {
    const pageNumbers = [];
    const visiblePages = 6;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={currentPage === i ? "font-semibold mx-3" : "mx-1"}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2"
          onClick={goToDoublePrevious}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="px-4 py-2"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {pageNumbers}
        <button
          className="px-4 py-2"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="px-4 py-2"
          onClick={goToDoubleNext}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    );
  };

  return (
    <div className="align-center border-dark-grey my-2 w-1/3 justify-center place-self-center rounded-xl border px-10 py-8">
      <h1 className="mt-6 text-center text-3xl font-bold">
        Please mark your interests!
      </h1>
      <p className="mt-3 text-center">We will keep you notified</p>
      <h3 className="mt-5 font-extra-semibold">My saved interests!</h3>
      <ul className="mb-5">{renderCategories()}</ul>
      {renderPagination()}
    </div>
  );
};

export default CategoryList;
