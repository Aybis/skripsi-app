import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class SectionPagination extends Component {
  constructor(props) {
    super(props);
    const { totalRecords = null, pageLimit = 30, pageNeighbours = 0 } = props;

    this.pageLimit = typeof pageLimit === 'number' ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === 'number' ? totalRecords : 0;

    this.pageNeighbours =
      typeof pageNeighbours === 'number'
        ? Math.max(0, Math.min(pageNeighbours, 2))
        : 0;

    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.state = { currentPage: 1 };
  }

  componentDidMount() {
    this.gotoPage(1);
  }

  gotoPage = (page) => {
    const { onPageChanged = (f) => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
      totalRecords: this.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.pageNeighbours * 2 - 1);
  };

  handleMoveRight = (evt) => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeighbours = this.pageNeighbours;

    const totalNumbers = this.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.totalRecords) return null;

    if (this.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <Fragment>
        <nav aria-label="Data Pagination">
          <ul className="flex p-1 flex-row gap-4">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li
                    key={index}
                    className="flex text-xs lg:text-sm lg:items-center lg:justify-center">
                    <Link
                      className="flex text-gray-800 font-semibold"
                      to="#"
                      aria-label="Previous"
                      onClick={this.handleMoveLeft}>
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </Link>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li
                    key={index}
                    className="flex text-xs lg:text-sm lg:items-center lg:justify-center">
                    <Link
                      className="flex text-gray-800 font-medium"
                      to="#"
                      aria-label="Next"
                      onClick={this.handleMoveRight}>
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </Link>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={` rounded text-xs lg:text-sm  ${
                    currentPage === page
                      ? '  text-apps-primary font-black lg:text-lg'
                      : ' text-gray-500'
                  }`}>
                  <Link
                    className="flex items-center justify-center font-semibold text-center lg:h-6 lg:w-6 hover:underline"
                    to="#"
                    onClick={(e) => this.handleClick(page, e)}>
                    {page}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Fragment>
    );
  }
}

SectionPagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  pageNeighbours: PropTypes.number,
  onPageChanged: PropTypes.func,
};

export default SectionPagination;
