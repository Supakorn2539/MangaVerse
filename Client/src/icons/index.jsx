import photoIcon from '../assets/photo.png'

export function DropdownArrow(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.707 14.707a1 1 0 01-1.414 0l-5-5a1 1 0 011.414-1.414L12 12.586l4.293-4.293a1 1 0 111.414 1.414l-5 5z"
          fill="#000"
        />
      </svg>
    )
  }

  export function PhotoIcon(props) {
    return (
      <img {...props} src={photoIcon}/>
    )
  }
  
  export function AddPictureIcon(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        className="icon"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          d="M840.5 798.2L662.3 599.5l-151 173.7-173.7-173.7-167.7 201c-21 30.4.9 71.8 37.9 71.6l594.7-3.3c36.2-.1 57.8-40.3 38-70.6z"
          fill="#FFB89A"
        />
        <path
          d="M741.6 647.3l-52.3-47.7c-12.2-11.2-31.2-10.3-42.4 1.9s-10.3 31.2 1.9 42.4l52.3 47.7c5.8 5.3 13 7.8 20.2 7.8 8.1 0 16.2-3.3 22.2-9.8 11.2-12.1 10.3-31.1-1.9-42.3zM631.2 546.5c-12.4-11-31.4-9.8-42.3 2.6l-98.8 111.7-171-165.7L87.9 724.7c-11.8 11.7-11.8 30.7-.1 42.4 5.9 5.9 13.6 8.9 21.3 8.9 7.6 0 15.3-2.9 21.1-8.7l189.4-188.1 173.8 168.5L633.8 589c11-12.5 9.8-31.5-2.6-42.5zM686.1999999999999 342.8a35.1 35.1 0 1070.2 0 35.1 35.1 0 10-70.2 0z"
          fill="#3C9"
        />
        <path
          d="M743.2 175.1H191.6c-70.6 0-128.3 57.7-128.3 128.3v499.2c0 70.6 57.7 128.3 128.3 128.3h551.5c70.6 0 128.3-57.7 128.3-128.3V303.5c.1-70.6-57.7-128.4-128.2-128.4zm68.3 627.6c0 18.1-7.1 35.2-20.1 48.2-13 13-30.1 20.1-48.2 20.1H191.6c-18.1 0-35.2-7.1-48.2-20.1-13-13-20.1-30.1-20.1-48.2V303.5c0-18.1 7.1-35.2 20.1-48.2 13-13 30.1-20.1 48.2-20.1h551.5c18.1 0 35.2 7.1 48.2 20.1 13 13 20.1 30.1 20.1 48.2v499.2z"
          fill="#45484C"
        />
        <path
          d="M799.7 90.9H237.2c-16.6 0-30 13.4-30 30s13.4 30 30 30h562.4c26.1 0 50.8 10.3 69.4 28.9 18.6 18.6 28.9 43.3 28.9 69.4v482.4c0 16.6 13.4 30 30 30s30-13.4 30-30V249.2C958 161.9 887 90.9 799.7 90.9z"
          fill="#45484C"
        />
      </svg>
    )
  }

 export function FavoriteIcon(props) {
    return (
      <svg
        fill="#000"
        viewBox="0 0 24 24"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
        {...props}
      >
        <g strokeWidth={2}>
          <path
            d="M19.57 5.44a4.91 4.91 0 010 6.93L12 20l-7.57-7.63A4.91 4.91 0 017.87 4a4.9 4.9 0 013.44 1.44 4.46 4.46 0 01.69.88 4.46 4.46 0 01.69-.88 4.83 4.83 0 016.88 0z"
            fill="red"
          />
          <path
            d="M19.57 5.44a4.91 4.91 0 010 6.93L12 20l-7.57-7.63A4.91 4.91 0 017.87 4a4.9 4.9 0 013.44 1.44 4.46 4.46 0 01.69.88 4.46 4.46 0 01.69-.88 4.83 4.83 0 016.88 0z"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    )
  }

 export function UnFavoriteIcon(props) {
    return (
      <svg
        fill="#000"
        viewBox="0 0 24 24"
        data-name="Flat Line"
        xmlns="http://www.w3.org/2000/svg"
        className="icon flat-line"
        {...props}
      >
        <g strokeWidth={2}>
          <path
            d="M19.57 5.44a4.91 4.91 0 010 6.93L12 20l-7.57-7.63A4.91 4.91 0 017.87 4a4.9 4.9 0 013.44 1.44 4.46 4.46 0 01.69.88 4.46 4.46 0 01.69-.88 4.83 4.83 0 016.88 0z"
            fill="#f5feff"
          />
          <path
            d="M19.57 5.44a4.91 4.91 0 010 6.93L12 20l-7.57-7.63A4.91 4.91 0 017.87 4a4.9 4.9 0 013.44 1.44 4.46 4.46 0 01.69.88 4.46 4.46 0 01.69-.88 4.83 4.83 0 016.88 0z"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    )
  }