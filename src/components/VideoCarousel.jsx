import { useEffect, useRef, useState } from 'react';
import { highlightsSlides } from '../constants';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [loadedData, setLoadedData] = useState([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((prev) => ({ ...prev, startPlay: true, isPlaying: true }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedMetadata = (index, event) =>
    setLoadedData((prev) => [...prev, event]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
          }
          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? '10vw'
                : window.innerWidth < 1200
                  ? '10vw'
                  : '4vw',
          });

          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: 'white',
          });
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(span[videoId], { backgroundColor: '#afafaf' });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration,
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, index) => {
    switch (type) {
      case 'video-end':
        setVideo((prev) => ({ ...prev, isEnd: true, videoId: index + 1 }));
        break;
      case 'video-last':
        setVideo((prev) => ({ ...prev, isLastVideo: true }));
        break;
      case 'video-reset':
        setVideo((prev) => ({ ...prev, isLastVideo: false, videoId: 0 }));
        break;
      case 'play':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying,
        }));
        break;
      case 'pause':
        setVideo((prev) => ({
          ...prev,
          isPlaying: !prev.isPlaying,
        }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {highlightsSlides.map((list, index) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                <video
                  ref={(el) => (videoRef.current[index] = el)}
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                  onPlay={() => {
                    setVideo((prev) => ({ ...prev, isPlaying: true }));
                  }}
                  onLoadedMetadata={(event) =>
                    handleLoadedMetadata(index, event)
                  }
                  onEnded={() =>
                    index !== 3
                      ? handleProcess('video-end', index)
                      : handleProcess('video-last')
                  }
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12 z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, index) => (
            <span
              ref={(el) => (videoDivRef.current[index] = el)}
              key={index}
              className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
            >
              <span
                ref={(el) => (videoSpanRef.current[index] = el)}
                className="absolute size-full rounded-full"
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={
              isLastVideo
                ? () => handleProcess('video-reset')
                : !isPlaying
                  ? () => handleProcess('play')
                  : () => handleProcess('pause')
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
