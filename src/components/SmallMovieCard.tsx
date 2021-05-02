import './SmallMovieCard.css'

export function SmallMovieCard(props) {
  const { name, href, imgSrc } = props

  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={imgSrc} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a className="small-movie-card__link" href={href}>
          {name}
        </a>
      </h3>
    </article>
  )
}
