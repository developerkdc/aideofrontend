import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Div from "@jumbo/shared/Div/Div";
import { BACKEND_URL } from "app/utils/constants/paths";

const styles = {
  mediaPlayer: {
    position: "relative",
  },
  videoPlayer: {
    width: "400px",
    height: "auto",
  },
  image: {
    background: "transparent",
  },
  audioPlayer: {
    display: "block",
    marginLeft: "100px",
  },
  imageOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  },
  overlayImage: {
    width: "400px",
    height: "600px",
  },
  arrowButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "black",
    fontSize: "24px",
    zIndex: 2,
  },
  nextButton: {
    backgroundColor: "transparent",
    height: "130%",
    width: "15%",
    right: 0,
  },
  prevButton: {
    left: 0,
    height: "130%",
    width: "15%",
    backgroundColor: "transparent",
  },
};

let id;
const url = `${BACKEND_URL}controllers/Content/uploads/`;
const MediaPlayer = ({ data }) => {
  let { contentData, _id } = data;
  id = _id;
  contentData = JSON.parse(contentData);
  console.log(id);
  return (
    <div style={styles.mediaPlayer}>
      <ImageOverlay data={contentData} />
    </div>
  );
};

const VideoPlayer = ({ videoSource, audioSource }) => {
  const videoPlayerStyle = {
    width: "400px",
    height: "auto",
  };

  return (
    <div style={styles.videoPlayer}>
      {videoSource && (
        <ReactPlayer
          url={videoSource}
          playing
          loop
          width="100%"
          height="100%"
        />
      )}
      {audioSource && (
        <audio autoPlay loop>
          <source src={`${url}/${audioSource}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {!videoSource && (
        <Div
          sx={{
            width: "400px",
            height: "750px",
            zIndex: -2,
            backgroundColor: "black",
          }}
        ></Div>
      )}
    </div>
  );
};

const ImageOverlay = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const segments = data.Segments;
  const images = segments.map((segment) => segment.Image);
  const defaultInterval = 5000;
  const audioRef = useRef(null);

  const handleNextImage = () => {
    stopAudio();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    playImageAudio();
  };

  const handleVideoEnded = () => {
    handleNextImage();
  };

  const handlePrevImage = () => {
    stopAudio();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
    playImageAudio();
  };

  const playImageAudio = () => {
    const audioSource = segments[currentImageIndex]?.Audio?.Source;
    if (audioSource) {
      const audioElement = new Audio(`${url}/${id}/${audioSource}`);
      audioRef.current = audioElement;
      audioElement.play();
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVideoSegment) {
        handleNextImage();
      }
    }, images[currentImageIndex]?.Interval || defaultInterval);

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex, images]);

  const loaders = images.map((image, index) => (
    <progress
      key={index}
      value={currentImageIndex === index ? 100 : 0}
      max={100}
      style={{
        margin: "0 2px",
        flex: `1 1 auto`,
        maxWidth: `calc(80% / ${images.length})`,
        zIndex: 5,
      }}
    />
  ));

  const currentSegment = segments[currentImageIndex];
  const isVideoSegment = currentSegment?.Video?.Source;

  return (
    <div style={styles.mediaPlayer}>
      <VideoPlayer
        videoSource={
          data?.Background?.Video?.Source
            ? `${url}/${id}/${data.Background.Video.Source}`
            : null
        }
        audioSource={data?.Background?.Audio?.Source}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          maxWidth: "auto",
        }}
      >
        {loaders}
      </div>

      <div style={styles.imageOverlay}>
        {isVideoSegment ? (
          <ReactPlayer
            url={`${url}/${id}/${currentSegment.Video.Source}`}
            playing
            width="400px"
            height="auto"
            onEnded={handleVideoEnded}
          />
        ) : (
          <img
            style={{ ...styles.overlayImage, background: "transparent" }}
            src={`${url}/${id}/${images[currentImageIndex]?.Source}`}
            alt={`Image ${currentImageIndex + 1}`}
          />
        )}
        <button
          style={{ ...styles.arrowButton, ...styles.prevButton }}
          onClick={handlePrevImage}
        ></button>
        <button
          style={{ ...styles.arrowButton, ...styles.nextButton }}
          onClick={handleNextImage}
        ></button>
      </div>

      {console.log(
        `Audio Source for Current Image: ${segments[currentImageIndex]?.Audio?.Source}`
      )}
    </div>
  );
};

export default MediaPlayer;
