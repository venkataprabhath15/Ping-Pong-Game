import React, { useState, useRef, useEffect } from "react";

const PingPong = () => {
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 450;
  const PADDLE_WIDTH = 10;
  const PADDLE_HEIGHT = 90;
  const BALL_SIZE = 15;
  const PADDLE_OFFSET = 10;
  const PADDLE_SPEED = 6;

  const keys = useRef({ w: false, s: false, up: false, down: false });

  const leftPaddleY = useRef((GAME_HEIGHT - PADDLE_HEIGHT) / 2);
  const rightPaddleY = useRef((GAME_HEIGHT - PADDLE_HEIGHT) / 2);

  const ball = useRef({
    x: GAME_WIDTH / 2 - BALL_SIZE / 2,
    y: GAME_HEIGHT / 2 - BALL_SIZE / 2,
    vx: 5,
    vy: 3,
  });

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [renderTick, setRenderTick] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleStart() {
    setIsRunning(true);
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "w" || e.key === "W") keys.current.w = true;
      if (e.key === "s" || e.key === "S") keys.current.s = true;
      if (e.key === "ArrowUp") keys.current.up = true;
      if (e.key === "ArrowDown") keys.current.down = true;
    }
    function onKeyUp(e) {
      if (e.key === "w" || e.key === "W") keys.current.w = false;
      if (e.key === "s" || e.key === "S") keys.current.s = false;
      if (e.key === "ArrowUp") keys.current.up = false;
      if (e.key === "ArrowDown") keys.current.down = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  function resetBall(toRight = Math.random() > 0.5) {
    ball.current.x = GAME_WIDTH / 2 - BALL_SIZE / 2;
    ball.current.y = GAME_HEIGHT / 2 - BALL_SIZE / 2;
    const speedX = 5 + Math.random() * 1.5; // little variation
    const speedY = (Math.random() * 4 + 2) * (Math.random() > 0.5 ? 1 : -1);
    ball.current.vx = toRight ? speedX : -speedX;
    ball.current.vy = speedY;
  }

  function handleRestart() {
    setLeftScore(0);
    setRightScore(0);
    leftPaddleY.current = (GAME_HEIGHT - PADDLE_HEIGHT) / 2;
    rightPaddleY.current = (GAME_HEIGHT - PADDLE_HEIGHT) / 2;
    resetBall(Math.random() > 0.5);
    setRenderTick((t) => t + 1);
  }

  useEffect(() => {
    let animId = null;

    function loop() {
      if (!isRunning) {
        animId = requestAnimationFrame(loop);
        return;
      }
      if (keys.current.w) leftPaddleY.current -= PADDLE_SPEED;
      if (keys.current.s) leftPaddleY.current += PADDLE_SPEED;
      if (keys.current.up) rightPaddleY.current -= PADDLE_SPEED;
      if (keys.current.down) rightPaddleY.current += PADDLE_SPEED;

      leftPaddleY.current = Math.max(
        0,
        Math.min(GAME_HEIGHT - PADDLE_HEIGHT, leftPaddleY.current)
      );
      rightPaddleY.current = Math.max(
        0,
        Math.min(GAME_HEIGHT - PADDLE_HEIGHT, rightPaddleY.current)
      );

      ball.current.x += ball.current.vx;
      ball.current.y += ball.current.vy;

      if (ball.current.y <= 0) {
        ball.current.y = 0;
        ball.current.vy *= -1;
      } else if (ball.current.y + BALL_SIZE >= GAME_HEIGHT) {
        ball.current.y = GAME_HEIGHT - BALL_SIZE;
        ball.current.vy *= -1;
      }

      if (
        ball.current.x <= PADDLE_OFFSET + PADDLE_WIDTH &&
        ball.current.x + BALL_SIZE >= PADDLE_OFFSET &&
        ball.current.y + BALL_SIZE >= leftPaddleY.current &&
        ball.current.y <= leftPaddleY.current + PADDLE_HEIGHT
      ) {
        ball.current.x = PADDLE_OFFSET + PADDLE_WIDTH;
        ball.current.vx = Math.abs(ball.current.vx) + 0.3;

        const hit =
          (ball.current.y +
            BALL_SIZE / 2 -
            (leftPaddleY.current + PADDLE_HEIGHT / 2)) /
          (PADDLE_HEIGHT / 2);
        ball.current.vy = hit * 6;
      }

      if (
        ball.current.x + BALL_SIZE >=
          GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH &&
        ball.current.x <= GAME_WIDTH - PADDLE_OFFSET &&
        ball.current.y + BALL_SIZE >= rightPaddleY.current &&
        ball.current.y <= rightPaddleY.current + PADDLE_HEIGHT
      ) {
        ball.current.x = GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH - BALL_SIZE;
        ball.current.vx = -Math.abs(ball.current.vx) - 0.3;
        const hit =
          (ball.current.y +
            BALL_SIZE / 2 -
            (rightPaddleY.current + PADDLE_HEIGHT / 2)) /
          (PADDLE_HEIGHT / 2);
        ball.current.vy = hit * 6;
      }

      if (ball.current.x + BALL_SIZE < 0) {
        setRightScore((s) => s + 1);
        resetBall(true);
      } else if (ball.current.x > GAME_WIDTH) {
        setLeftScore((s) => s + 1);
        resetBall(false);
      }
      setRenderTick((t) => t + 1);
      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [isRunning]);

  function Winner() {
    if (leftScore === 10) {
      return "Left Player Wins!";
    }
    if (rightScore === 10) {
      return "Right Player Wins!";
    }
    return null;
  }

  useEffect(() => {
    if ((leftScore >= 10) | (rightScore >= 10)) {
      setIsRunning(false);
      alert(Winner());
    }
  }, [leftScore, rightScore]);

  return (
    <div
      style={{
        textAlign: "center",
        color: "black",
        fontFamily: "sans-serif",
        backgroundColor: "lightblue",
        padding: 20,
      }}
    >
      <h2 style={{ marginBottom: 6 }}>
        <u>Ping Pong Game</u>
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          marginBottom: 8,
        }}
      >
        <div style={{ fontSize: 20 }}>Left: {leftScore}</div>

        <div style={{ fontSize: 20 }}>Right: {rightScore}</div>
      </div>
      <div
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          border: "3px solid white",
          background: "black",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left paddle */}
        <div
          style={{
            position: "absolute",
            left: PADDLE_OFFSET,
            top: leftPaddleY.current,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            background: "white",
            borderRadius: 4,
          }}
        />

        {/* Right paddle */}
        <div
          style={{
            position: "absolute",
            left: GAME_WIDTH - PADDLE_OFFSET - PADDLE_WIDTH,
            top: rightPaddleY.current,
            width: PADDLE_WIDTH,
            height: PADDLE_HEIGHT,
            background: "white",
            borderRadius: 4,
          }}
        />

        {/* Ball */}
        <div
          style={{
            position: "absolute",
            left: ball.current.x,
            top: ball.current.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
            background: "white",
            borderRadius: "50%",
          }}
        />
      </div>
      <button onClick={handleRestart} style={{ marginTop: 10 }}>
        Restart
      </button>
      &nbsp; | &nbsp;
      <button onClick={handleStart} style={{ marginTop: 10 }}>
        Start
      </button>
      <p style={{ color: "black", marginTop: 10 }}>
        Controls: Left — W / S &nbsp; | &nbsp; Right — ↑ / ↓
      </p>
      <h1 class="winner"></h1>
    </div>
  );
};

export default PingPong;
