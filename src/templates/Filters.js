const filterRender = ({TITLE, CHECKED = false}) => `
  <input type="radio" id="filter-${TITLE.toLowerCase()}" name="filter" value="${TITLE.toLowerCase()}" ${
  CHECKED ? `checked` : null
}>
          <label class="trip-filter__item" for="filter-${TITLE.toLowerCase()}">${TITLE}</label>
`;
export default filterRender;
