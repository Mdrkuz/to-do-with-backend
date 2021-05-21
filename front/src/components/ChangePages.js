
export const ChangePages = ({todoTotal, currentPage, setCurrentPage, PAGE_LIMIT}) => {
  const maxPage = Math.ceil(todoTotal / PAGE_LIMIT)
  const pages = []
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i)
  }
  const changePage = page => {
    if (!(page < 1 || page > maxPage)) {
      setCurrentPage(page)
    }
  }
  const left = currentPage < 3 ? 0 : currentPage - 3;
  const right = (currentPage + 2) > maxPage ? maxPage : currentPage + 2;
  const pagesToRender = pages.length < 6 ? pages : pages.slice(left, right);

  return <>
    <button onClick={() => changePage(1)}>first</button>
    <button onClick={() => changePage(currentPage - 1)}>prev</button>
    {pagesToRender.map(it =>
      <button style={it === currentPage ? ({color: 'green'}) : {}} onClick={() => changePage(it)}>{it}</button>
    )}
    <button onClick={() => changePage(currentPage + 1)}>next</button>
    <button onClick={() => changePage(maxPage)}>last</button>
  </>
}