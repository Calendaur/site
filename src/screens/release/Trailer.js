import React from 'react'
import styled from '@emotion/styled'
import { getYoutubeId } from 'shared/utils'

const Wrapper = styled.div`
  flex: 1;

  & > .aspectRatio {
    position: relative;
    width: 100%;
    padding-top: 56.25%;

    & > iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      border-radius: 12px;
    }
  }
`

function Trailer({ url }) {
  return (
    <Wrapper id="trailer">
      <div className="aspectRatio">
        <iframe
          title="Trailer"
          frameBorder="0"
          className="lazyload"
          allowFullScreen
          width="100%"
          height="100%"
          data-src={`https://www.youtube.com/embed/${getYoutubeId(url)}`}
        />
      </div>
    </Wrapper>
  )
}

export default Trailer
