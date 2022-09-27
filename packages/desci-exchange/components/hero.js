import Button from './button.js';

export default function Hero() {
  return (
    <div className="absolute bg--dsepurple top-0">
      <div className=" ">
        <div className="relative z-30 text-2xl text-white bg-purple-300 bg-opacity-50 text-center">
          <div
            id="{'banner'}"
            className="relative pt-24 pb-4 text-center banner"
          >
            <img
              height="auto"
              width="100%"
              className="px-4"
              src="/images/desci-exchange/desci-exchange-text-logo-wide-text-hands-no-background.png"
              alt="Hero Image"
            />
            <video id={'videobcg'} autoPlay loop muted className="pt-20">
              <source src="videos/hero-background-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="flex justify-center p-2">
            <Button className="mx-4 mb-4" href="#getting-started">
              Create your Digital Twin
            </Button>
            <p className="p-2"> or </p>
            <Button className="mx-4 mb-4" href="#getting-started">
              Buy Data
            </Button>
          </div>

          <div className="card relative p-3">
            <div className="bg--dseorange max-w-4xl mx-auto border-4 md:py-0 py-8 sm:py-10 px-8 sm:px-12 border-gray-300 flex md:flex-row flex-col p-0">
              <div className="md:w-1/2 p-4  flex flex-col items-center md:mx-0 mx-auto max-w-sm md:items-start md:text-left text-left sm:text-center justify-center">
                <h2
                  className="font-black text-2xl sm:text-3xl"
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
                  Your digital twin NFT is like a soul-bound ERC721 skeleton key
                  to access all of your data.
                </p>
                <Button className="mx-4 mb-8" href="#getting-started">
                  Create Yours Now!
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-end">
                <img
                  className="h-auto md:max-w-full max-w-sm w-full md:w-auto md:h-64"
                  src="images/digital-twins/broken-robot.png"
                  alt={'broken-robot'}
                ></img>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-10"></div>
        </div>
      </div>
    </div>
  );
}
