import React, { useState, useEffect } from 'react';

const Ball = ({ x, y }) => (
  <div 
    className="absolute w-8 h-8 rounded-full bg-pink-500"
    style={{ left: `${x}px`, top: `${y}px` }}
  />
);

const Index = () => {
  const [balls, setBalls] = useState([]);

  useEffect(() => {
    const createBall = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
    });

    setBalls(Array(5).fill().map(createBall));

    const moveBalls = () => {
      setBalls(prevBalls => prevBalls.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy;

        if (newX < 0 || newX > window.innerWidth - 32) newVx = -newVx;
        if (newY < 0 || newY > window.innerHeight - 32) newVy = -newVy;

        return {
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy,
        };
      }));
    };

    const intervalId = setInterval(moveBalls, 50);

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