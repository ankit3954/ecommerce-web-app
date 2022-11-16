

//used reselect library bcz it helps to prevent re render of unwanted components. 
// ex. if one user signed out then reducer state got updated as a result use Selector got triggered
// which re render yhe components but category component also got triggered which we didnt want
// so reselect helps us.

    import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.category;

const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => categories.reduce((acc, category) => {
    const {items, title} = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);