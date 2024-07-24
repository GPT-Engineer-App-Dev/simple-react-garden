import React, { useState, useEffect } from 'react';

const Ball = ({ x, y }) => (
  <div 
    className="absolute w-6 h-6 rounded-full bg-pink-500"
    style={{ left: `${x}px`, top: `${y}px` }}
  />
);

const Index = () => {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const createBall = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 20, // Increased velocity
      vy: (Math.random() - 0.5) * 20, // Increased velocity
    });

    setBalls(Array(10).fill().map(createBall)); // Increased number of balls

    const moveBalls = () => {
      setBalls(prevBalls => prevBalls.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy;

        if (newX < 0 || newX > window.innerWidth - 24) newVx = -newVx;
        if (newY < 0 || newY > window.innerHeight - 24) newVy = -newVy;

        return {
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      }));
    };

    const intervalId = setInterval(moveBalls, 16); // Increased update frequency (approx. 60 FPS)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full h-screen bg-lime-300 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white">Hello, World!</h1>
      </div>
      {balls.map((ball, index) => (
        <Ball key={index} x={ball.x} y={ball.y} />
      ))}
    </div>
  );
};

export default Index;