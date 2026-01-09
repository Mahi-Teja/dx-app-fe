import { useDispatch, useSelector } from "react-redux";
import EmptyStateNoAction from "@/components/EmptyStateNoAction";
import { useEffect } from "react";
import CategoryCard from "@/features/categories/components/CategoryCard";
import { getUserCategories } from "@/features/categories/api/category.api";
import { setCategories } from "@/features/categories/store/category.slice";

const CategoriesTab = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fn() {
      const res = await getUserCategories();
      dispatch(setCategories(res.data));
    }
    fn();
  }, []);
  const categories = useSelector((s) => s.categories);

  if (!categories.length) {
    return <EmptyStateNoAction title="No categories yet" />;
  }

  return (
    <div className="grid gap-4 px-4 md:px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category._id || category.id} category={category} />
      ))}
    </div>
  );
};

export default CategoriesTab;
