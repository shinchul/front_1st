import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';


export default function Home() {
    return (
      <>
        <Helmet>
          <title>SEO 최적화 테스트</title>
          <meta name="description" content="SEO 최적화 테스트" />
          {/* Open Graph */}
          <meta property="og:title" content="SEO 최적화 테스트" />
          <meta
            property="og:description"
            content="SEO 최적화 테스트 연습입니다."
          />
          <meta property="og:image" content="https://via.placeholder.com/1200" />
          <meta property="og:url" content="https://www.google.com" />
          <meta property="og:type" content="website" />
          {/* Twitter */}
          <meta property="twitter:title" content="SEO 최적화 테스트" />
          <meta
            property="twitter:description"
            content="SEO 최적화 테스트 연습입니다."
          />
          <meta
            property="twitter:image"
            content="https://via.placeholder.com/1200"
          />
          <meta property="twitter:card" content="summary_large_image" />
        </Helmet>
        <div>Home</div>
        <Link to="/counter">Counter</Link>
      </>
    );
  }
  