import React, { useState, useEffect, useRef } from "react";
import "../styles/MiniGame.css";

// SPRITE ASSETS
const spaceshipSprite = "/assets/sprites/SpaceShip.png";
const enemySprites = {
  basic: "/assets/sprites/insect-1.png",
  fast: "/assets/sprites/insect-2.png",
  agile: "/assets/sprites/insect-1.png",
  heavy: "/assets/sprites/tiny_ship13.png",
  twin: "/assets/sprites/tiny_ship1.png",
};
const powerUpSprite = "/assets/sprites/bonus_time.png";
const playerBulletSprite = "/assets/sprites/laser-3.png";
const enemyBulletSprite = "/assets/sprites/laser-2.png";

const playerExplosionFrames = Array.from(
  { length: 10 },
  (_, i) => `/assets/sprites/player-explosion/frame-${i + 1}.png`
);

const enemyExplosionFrames = Array.from(
  { length: 6 },
  (_, i) => `/assets/sprites/enemy-explosion/frame-${i + 1}.png`
);


// Enemy size configuration
const enemySizes = {
  basic: { width: 20, height: 20 },
  fast: { width: 35, height: 35 },
  agile: { width: 30, height: 30 },
  heavy: { width: 50, height: 50 },
  twin: { width: 40, height: 40 },
};

// DYNAMIC ENEMY MOVEMENT CONFIGS
const enemyMovementConfigs = {
  basic: { speed: 4, amplitude: 70, frequency: 0.13 },
  fast: { speed: 7, amplitude: 40, frequency: 0.1 },
  agile: { speed: 5, amplitude: 30, frequency: 0.15 },
  heavy: { speed: 3, amplitude: 10, frequency: 0.12 },
  twin: { speed: 5, amplitude: 20, frequency: 0.1 },
};

function AboutMiniGame({ exitGame }) {
  // Container dimensions
  const containerWidth = window.innerWidth * 0.4;
  const containerHeight = window.innerHeight * 0.9;

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [spawnRate, setSpawnRate] = useState(2000);
  const [spaceshipX, setSpaceshipX] = useState(containerWidth / 2);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);
  const [enemyBullets, setEnemyBullets] = useState([]);
  const [powerUps, setPowerUps] = useState([]);
  const [doubleBulletActive, setDoubleBulletActive] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [explosions, setExplosions] = useState([]);

  // enemyRef to hold latest enemies for shooting
  const enemyRef = useRef(enemies);
  useEffect(() => {
    enemyRef.current = enemies;
  }, [enemies]);

  // Refs for dynamic spawnRate and score
  const spawnRateRef = useRef(spawnRate);
  useEffect(() => {
    spawnRateRef.current = spawnRate;
  }, [spawnRate]);

  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Reset game
  const resetGame = () => {
    setSpaceshipX(containerWidth / 2);
    setBullets([]);
    setEnemies([]);
    setEnemyBullets([]);
    setPowerUps([]);
    setScore(0);
    setGameOver(false);
    setDoubleBulletActive(false);
  };

  // Increase spawn rate based on score (every 250 points reduce interval by 100ms, min 500ms)
  useEffect(() => {
    const difficulty = Math.floor(score / 250);
    const newRate = Math.max(2000 - difficulty * 100, 500);
    setSpawnRate(newRate);
  }, [score]);

  // Player input
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameStarted || gameOver) return;
      const key = event.key.toLowerCase();
      if ((key === "arrowleft" || key === "a") && spaceshipX > 20) {
        setSpaceshipX((prev) => prev - 30);
      } else if ((key === "arrowright" || key === "d") && spaceshipX < containerWidth - 80) {
        setSpaceshipX((prev) => prev + 30);
      } else if (event.key === " ") {
        shootBullet();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [spaceshipX, gameOver, gameStarted, containerWidth]);

  // Shoot bullet
  const shootBullet = () => {
    if (!gameStarted || gameOver) return;
    if (doubleBulletActive) {
      setBullets((prev) => [
        ...prev,
        { x: spaceshipX + 10, y: containerHeight - 100 },
        { x: spaceshipX + 30, y: containerHeight - 100 },
      ]);
    } else {
      setBullets((prev) => [
        ...prev,
        { x: spaceshipX + 20, y: containerHeight - 100 },
      ]);
    }
  };

  // Explosions
  const triggerExplosion = (x, y, type) => {
    const totalFrames = type === "player" ? 10 : 6;
    const explosionId = Math.random();

    setExplosions((prev) => [...prev, { id: explosionId, x, y, type, frame: 0 }]);

    let frameIndex = 0;
    const interval = setInterval(() => {
      setExplosions((prev) =>
        prev.map((exp) =>
          exp.id === explosionId
            ? { ...exp, frame: Math.min(exp.frame + 1, totalFrames - 1) }
            : exp
        )
      );

      frameIndex++;
      if (frameIndex >= totalFrames) {
        clearInterval(interval);
        setTimeout(() => {
          setExplosions((prev) => prev.filter((exp) => exp.id !== explosionId));
        }, 200); 
      }
    }, 80); 
  };


  // Move player bullets upward
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, y: b.y - 15 })).filter((b) => b.y > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Enemy spawn using recursive setTimeout
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    let timeoutId;
    const spawnEnemy = () => {
      if (gameOver) return;
      const difficulty = Math.floor(scoreRef.current / 250);
      const rand = Math.random();
      if (rand < 0.3) {
        // Twin spawn (30% chance): Spawn 2 separate enemy objects
        // Ensure two 40px ships (each 40x40) fit side by side (total 80px)
        const baseX = Math.random() * (containerWidth - 80);
        const twinConfig = enemyMovementConfigs.twin;
        const size = enemySizes.twin;
        const commonProps = {
          type: "twin",
          points: 15,
          speed: twinConfig.speed + difficulty,
          amplitude: twinConfig.amplitude,
          frequency: twinConfig.frequency,
          time: 0,
          canShoot: Math.random() < 0.4,
          baseX,
          width: size.width,
          height: size.height,
        };
        // Spawn two enemies with an offset so they appear connected
        const enemy1 = { id: Math.random(), x: baseX, y: 0, offset: 0, ...commonProps };
        const enemy2 = { id: Math.random(), x: baseX, y: 0, offset: size.width, ...commonProps };
        setEnemies((prev) => [...prev, enemy1, enemy2]);
      } else {
        // Single enemy spawn (70% chance)
        const enemyTypes = ["basic", "fast", "agile", "heavy"];
        const chosenType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        const config = enemyMovementConfigs[chosenType];
        const size = enemySizes[chosenType] || { width: 40, height: 40 };
        let points;
        if (chosenType === "basic") points = 10;
        else if (chosenType === "fast") points = 20;
        else if (chosenType === "agile") points = 15;
        else if (chosenType === "heavy") points = 25;
        const baseX = Math.random() * (containerWidth - size.width);
        const newEnemy = {
          id: Math.random(),
          type: chosenType,
          points,
          speed: config.speed + difficulty,
          amplitude: config.amplitude,
          frequency: config.frequency,
          time: 0,
          canShoot: Math.random() < 0.4,
          baseX,
          x: baseX,
          y: 0,
          width: size.width,
          height: size.height,
        };
        setEnemies((prev) => [...prev, newEnemy]);
      }
      timeoutId = setTimeout(spawnEnemy, spawnRateRef.current);
    };
    spawnEnemy();
    return () => clearTimeout(timeoutId);
  }, [gameStarted, containerWidth, gameOver]);

  // Check if any enemy collides with the player's spaceship
  useEffect(() => {
    if (!gameStarted) return;
    const shipLeft = spaceshipX;
    const shipRight = spaceshipX + 40;
    const shipTop = containerHeight - 100;
    const shipBottom = shipTop + 40;

    const collision = enemies.find((enemy) => {
      const eWidth = enemy.width || 40;
      const eHeight = enemy.height || 40;
      return (
        enemy.x < shipRight &&
        enemy.x + eWidth > shipLeft &&
        enemy.y < shipBottom &&
        enemy.y + eHeight > shipTop
      );
    });
    if (collision) {
      triggerExplosion(spaceshipX, containerHeight - 100, "player");
      setGameOver(true);
    }
  }, [enemies, spaceshipX, containerHeight, gameStarted]);


  // Move enemies with a sine-wave trajectory (accounts for twin offset)
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setEnemies((prev) =>
        prev.map((enemy) => {
          const newTime = enemy.time + enemy.frequency;
          const offset = enemy.offset || 0;
          return {
            ...enemy,
            y: enemy.y + enemy.speed,
            time: newTime,
            x: enemy.baseX + offset + enemy.amplitude * Math.sin(newTime),
          };
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Enemy shooting – enemies with canShoot fire bullets every 1200ms
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      if (gameOver) return;
      const shooterEnemies = enemyRef.current.filter((e) => e.canShoot);
      if (shooterEnemies.length > 0) {
        const randomEnemy =
          shooterEnemies[Math.floor(Math.random() * shooterEnemies.length)];
        setEnemyBullets((prev) => [
          ...prev,
          { x: randomEnemy.x + 20, y: randomEnemy.y + 30 },
        ]);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Move enemy bullets downward
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setEnemyBullets((prev) =>
        prev.map((b) => ({ ...b, y: b.y + 7 }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Spawn power-ups
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      if (Math.random() < 0.5 && !gameOver) {
        const newPowerUp = {
          id: Math.random(),
          x: Math.random() * (containerWidth - 50),
          y: 0,
        };
        setPowerUps((prev) => [...prev, newPowerUp]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [gameStarted, containerWidth, gameOver]);

  // Move power-ups downward
  useEffect(() => {
    if (!gameStarted) return;
    const interval = setInterval(() => {
      setPowerUps((prev) =>
        prev
          .map((p) => ({ ...p, y: p.y + 3 }))
          .filter((p) => p.y < containerHeight)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameStarted, containerHeight]);

  // Collision detection
  useEffect(() => {
    if (!gameStarted) return;

    // Player bullets vs. enemies
    setEnemies((prev) =>
      prev.filter((enemy) => {
        const eWidth = enemy.width || 40;
        const eHeight = enemy.height || 40;
        const bulletHit = bullets.find(
          (b) =>
            b.x > enemy.x - 20 &&
            b.x < enemy.x + eWidth &&
            b.y > enemy.y &&
            b.y < enemy.y + eHeight
        );
        if (bulletHit) {
          triggerExplosion(enemy.x, enemy.y, "enemy");
          setScore((s) => s + enemy.points);
          setBullets((bs) => bs.filter((b) => b !== bulletHit));
          return false;
        }
        return true;
      })
    );

    // Enemy bullets vs. spaceship.
    setEnemyBullets((prev) =>
      prev.filter((bullet) => {
        const shipLeft = spaceshipX;
        const shipRight = spaceshipX + 40;
        const shipTop = containerHeight - 100;
        const shipBottom = shipTop + 40;
        if (
          bullet.x > shipLeft &&
          bullet.x < shipRight &&
          bullet.y > shipTop &&
          bullet.y < shipBottom
        ) {
          triggerExplosion(spaceshipX, containerHeight - 100, "player");
          setGameOver(true);
          return false;
        }
        return true;
      })
    );

    // Power-ups vs. spaceship (collecting)
    setPowerUps((prev) =>
      prev.filter((p) => {
        const shipLeft = spaceshipX;
        const shipRight = spaceshipX + 40;
        const shipTop = containerHeight - 100;
        const shipBottom = shipTop + 40;
        if (
          p.x + 30 > shipLeft &&
          p.x < shipRight &&
          p.y + 30 > shipTop &&
          p.y < shipBottom
        ) {
          setDoubleBulletActive(true);
          setTimeout(() => setDoubleBulletActive(false), 10000);
          return false;
        }
        return true;
      })
    );

    // Power-ups vs. bullets (shooting them)
    setPowerUps((prev) =>
      prev.filter((p) => {
        const bulletHit = bullets.find(
          (b) =>
            b.x > p.x &&
            b.x < p.x + 30 &&
            b.y > p.y &&
            b.y < p.y + 30
        );
        if (bulletHit) {
          setDoubleBulletActive(true);
          setTimeout(() => setDoubleBulletActive(false), 10000);
          setBullets((bs) => bs.filter((b) => b !== bulletHit));
          return false;
        }
        return true;
      })
    );
  }, [gameStarted, bullets, containerHeight, enemies, enemyBullets, powerUps, spaceshipX]);

  return (
    <div className="game-container">
      {/* Background Image */}
      <img className="game-background" src="/assets/sprites/Stars-B.png" alt="Game Background" />

      {!gameStarted && (
        <div className="start-menu">
          <h2>Shoot as many enemies as you can before they destroy you!</h2>
          <div className ="menu-buttons">
          <h2>Controls: A + D or ⬅➡ to move... Spacebar to shoot</h2>
          </div>
          <button onClick={() => setGameStarted(true)}>Start</button>
        </div>
      )}

      {gameStarted && (
        <>
          <div className="score-board">Score: {score}</div>
          <button className="quit-button" onClick={exitGame}>Quit</button>

          {gameOver ? (
            explosions.map((exp) =>
              exp.type === "player" ? (
                <img
                  key={exp.id}
                  className="explosion"
                  src={playerExplosionFrames[exp.frame]}
                  alt="Player Explosion"
                  style={{ left: `${exp.x}px`, top: `${exp.y}px` }}
                />
              ) : null
            )
          ) : (
            <img className="spaceship" src={spaceshipSprite} alt="Spaceship" style={{ left: `${spaceshipX}px`, top: `${containerHeight - 100}px` }} />
          )}


          {/* Player Bullets */}
          {bullets.map((b, i) => (
            <img key={i} className="bullet" src={playerBulletSprite} alt="Player Bullet" style={{ left: b.x, top: b.y }} />
          ))}

          {/* Enemy Sprites */}
          {enemies.map((enemy) => (
            <img
              key={enemy.id}
              className="enemy"
              src={enemySprites[enemy.type] || enemySprites.basic}
              alt="Enemy"
              style={{
                left: enemy.x,
                top: enemy.y,
                width: enemy.width ? enemy.width : 40,
                height: enemy.height ? enemy.height : 40,
              }}
            />
          ))}

          {/* Explosions */}
          {explosions.map((exp) => (
            <img
              key={exp.id}
              className="explosion"
              src={exp.type === "player" ? playerExplosionFrames[exp.frame] : enemyExplosionFrames[exp.frame]}
              alt="Explosion"
              style={{ left: `${exp.x}px`, top: `${exp.y}px` }}
            />
          ))}

          {/* Enemy Bullets (Using PNG Sprite) */}
          {enemyBullets.map((bullet, i) => (
            <img key={i} className="enemy-bullet" src={enemyBulletSprite} alt="Enemy Bullet" style={{ left: bullet.x, top: bullet.y }} />
          ))}

          {/* Power-Ups */}
          {powerUps.map((p) => (
            <img key={p.id} className="power-up" src={powerUpSprite} alt="Power Up" style={{ left: p.x, top: p.y }} />
          ))}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="game-over">
              <p>Game Over!</p>
              <p>Your Final Score: {score}</p>
              <div className="game-over-buttons">
                <button onClick={resetGame}>Play Again</button>
                <button onClick={exitGame}>Quit</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AboutMiniGame;
