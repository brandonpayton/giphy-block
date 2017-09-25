( function( wp, $, _ ) {
	var GIPHY_URL = 'https://api.giphy.com/v1/gifs/search?api_key=Fswo3IBHt0TViFMN6zYgbYzSEb3sLx7I&limit=10&offset=0&rating=G&lang=en&q=';

	// For later use.
	var fetchGifs = _.debounce( function fetchGifs( search ) {
		if ( attributes.fetching ) {
			return;
		}

		props.setAttributes( {
			fetching: true,
		} );

		$.getJSON( GIPHY_URL + encodeURI( search ) )
			.success( function fetchSuccess( data ) {
				props.setAttributes( {
					fetching: false,
					matches: data.data
				} );
			} )
			.fail( function fetchFail() {
				props.setAttributes( { fetching: false } );
			} );
	}, 1000 );

	function mapSearchResults( gif ) {
		var gifImage = wp.element.createElement( 'img', {
			key: gif.id + '-img',
			src: gif.images.fixed_height_small.url,
		} );

		return wp.element.createElement( 'li', {
			key: gif.id,
			onClick: function onClickFetchedGif() {
				props.setAttributes( {
					url: gif.images.original.url
				} );
			}
		}, gifImage );
	}

	var searchField = wp.element.createElement( 'input', {
		type: 'search',
		key: 'search-field',
		placeholder: __( 'Enter Search Term Here', 'giphy-block' ),
		onChange: function onChangeGiphySearch( event ) {
			fetchGifs( event.target.value );
		},
		onKeyUp: function onKeyUpGiphySearch( event ) {
			// If the esc key is pressed, clear out the field and matches.
			if ( event.keyCode === 27 ) {
				event.target.value = '';
				props.setAttributes( {
					matches: [],
				} );
			}
		}
	} );

	var resultsDiv = wp.element.createElement( 'div', {
		className: 'giphy__results',
		key: 'results-wrapper'
	}, wp.element.createElement( 'ul', { key: 'results' }, results ) );


	// Create your block here.


} )( window.wp, window.jQuery, window._ );
