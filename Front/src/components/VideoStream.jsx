import React from 'react';

export const VideoStream = ({ src }) => {
  return (
    <video autoPlay controls width={640}>
  <source src="http://localhost:5000/video_feed/local" type="multipart/x-mixed-replace; boundary=frame" />
</video>
  );
};