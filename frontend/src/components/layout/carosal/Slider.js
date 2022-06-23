import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cards from "../../home/Cards";

const Slider = ({data}) => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1100 },
      items: 4,
      slidesToSlide: 4
    },
    desktop: {
      breakpoint: { max: 1100, min: 620 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 620, min: 0 },
      items: 2,
      slidesToSlide: 2
    }
    // mobile: {
    // 	breakpoint: { max: 464, min: 0 },
    // 	items: 1
    // }
  };


  return (


    <Carousel
							responsive={responsive}
							swipeable={false}
							draggable={false}
							showDots={true}
							infinite={true}
							// autoPlay={true}
							// autoPlaySpeed={1000}
					
							// customTransition="all .5"
							transitionDuration={500}
							containerClass="carousel-container"
							centerMode={true}
							dotListClass="custom-dot-list-style"
							itemClass="carousel-item-padding-40-px"
						>
							
							{data &&
								data.map((film) => (
									<div>
										{' '}
										<Cards data={film} Upcoming={true} />
									</div>
								))}
						</Carousel>
  )
}

export default Slider
