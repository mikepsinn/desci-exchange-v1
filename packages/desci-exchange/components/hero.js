import Button from './button.js';

const cardHtml = `
      <div className="z-30 max-w-4xl mx-auto rounded-xl border-2 border-l border-t md:py-0 py-8 sm:py-10 px-8 sm:px-12 border-gray-300 flex md:flex-row flex-col p-0">
        <div className="md:w-1/2 flex flex-col items-center md:max-w-full md:mx-0 mx-auto max-w-sm md:items-start md:text-left text-left sm:text-center justify-center">
          <h2
            className="font-black text-2xl sm:text-3xl w-full"
            data-lt-tmp-id="lt-184"
            spellCheck="false"
            data-gramm="false"
          >
            Mint Your Digital Twin NFT for a Polygon Penny!
          </h2>
          <p
            className="text-gray-500 sm:text-base text-sm mb-5 mt-4"
            data-lt-tmp-id="lt-519998"
            spellCheck="false"
            data-gramm="false"
          >
            Your digital twin NFT is like a soul-bound ERC721 skeleton key to
            access all of your data.
          </p>
          <a
            href="#_"
            className="bg-gray-900 px-5 sm:w-auto w-full text-center text-sm font-medium py-3 text-white rounded-md inline-block"
          >
            Create Yours Now!
          </a>
        </div>
        <div className="md:w-1/2 flex justify-end">
          <img
            className="h-auto md:max-w-full max-w-sm w-full md:w-auto md:h-64"
            src="https://cdn.devdojo.com/images/december2021/dd-cta.png"
            alt={'hi'}
          ></img>
        </div>
      </div>
`;

export default function Hero() {
  return (
    <div className="absolute bg-orange top-0 min-w-full">
      <div className="relative w-50 items-center h-screen text-center">
        <div className="relative z-30 p-5 text-2xl text-white bg-purple-300 bg-opacity-50 text-center">
          <div className="relative lg:absolute pt-32 pb-4 text-center">
            <img
              height="auto"
              width="100%"
              className="px-4"
              src="images/desci-exchange/desci-exchange-text-logo-wide-text-hands-no-background.png"
              alt="Hero Image"
            />
            <div className="flex justify-center pt-10">
              <Button className="mx-4 mb-8" href="#getting-started">
                Create your Digital Twin
              </Button>
              <p className="p-2"> or </p>
              <Button className="mx-4 mb-8" href="#getting-started">
                Buy Data
              </Button>
            </div>
            <div className="flex justify-center pt-10"></div>
          </div>
        </div>
        <video
          autoPlay
          loop
          muted
          className="absolute z-10 w-auto min-w-full min-h-full max-w-none fit top-0"
        >
          <source
            src="images/pexels-rostislav-uzunov-5680034.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div dangerouslySetInnerHTML={{ __html: cardHtml }} />
    </div>
  );
}
