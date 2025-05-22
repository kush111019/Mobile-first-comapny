// utils/pagination.js
function applyPagination(query, page, limit) {
  const offset = (page - 1) * limit;
  return {
    ...query,
    offset,
    limit: Number(limit),
  };
}

module.exports = { applyPagination };
