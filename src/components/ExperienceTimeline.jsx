import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Text, Sky, Cloud } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Vector3, CatmullRomCurve3, BufferGeometry, Float32BufferAttribute, DoubleSide } from 'three';
import { useInView } from 'react-intersection-observer';
import { experiences } from '../constants';
import { fadeIn } from '../utils/motion';




// Enhanced Road Surface with realistic texture and lane markings
const RoadSurface = ({ curve, segments = 150 }) => {
  const roadRef = useRef();
  const laneMarkingsRef = useRef();

  const roadGeometry = useMemo(() => {
    const points = curve.getPoints(segments);
    const geometry = new BufferGeometry();

    const vertices = [];
    const uvs = [];
    const normals = [];
    const indices = [];

    const roadWidth = 6; // Even wider road for full container stretch

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const nextPoint = points[i + 1] || points[i];
      const prevPoint = points[i - 1] || points[i];

      // Calculate smooth direction using previous and next points
      const direction = new Vector3().subVectors(nextPoint, prevPoint).normalize();
      const perpendicular = new Vector3(-direction.z, 0, direction.x).normalize();

      // Create road vertices with slight elevation variation
      const elevation = Math.sin(i * 0.1) * 0.05; // Subtle road undulation
      const leftPoint = point.clone().add(perpendicular.clone().multiplyScalar(roadWidth / 2));
      const rightPoint = point.clone().add(perpendicular.clone().multiplyScalar(-roadWidth / 2));

      leftPoint.y += elevation;
      rightPoint.y += elevation;

      vertices.push(leftPoint.x, leftPoint.y, leftPoint.z);
      vertices.push(rightPoint.x, rightPoint.y, rightPoint.z);

      // Normal vectors for lighting
      normals.push(0, 1, 0);
      normals.push(0, 1, 0);

      // UV coordinates for texture tiling
      const u = i / (points.length - 1);
      uvs.push(0, u * 15); // Left side - increased tiling
      uvs.push(1, u * 15); // Right side

      // Create triangles
      if (i < points.length - 1) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2);
        indices.push(base + 1, base + 3, base + 2);
      }
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    return geometry;
  }, [curve, segments]);

  // Lane markings geometry
  const laneMarkingsGeometry = useMemo(() => {
    const points = curve.getPoints(segments);
    const geometry = new BufferGeometry();

    const vertices = [];
    const indices = [];

    const markingWidth = 0.1;
    const dashLength = 1;
    const gapLength = 0.5;

    let distance = 0;

    for (let i = 0; i < points.length - 1; i++) {
      const point = points[i];
      const nextPoint = points[i + 1];
      const segmentLength = point.distanceTo(nextPoint);

      const direction = new Vector3().subVectors(nextPoint, point).normalize();
      const perpendicular = new Vector3(-direction.z, 0, direction.x).normalize();

      // Create dashed center line
      const cycleLength = dashLength + gapLength;
      const cyclePosition = distance % cycleLength;

      if (cyclePosition < dashLength) {
        const left = point.clone().add(perpendicular.clone().multiplyScalar(markingWidth / 2));
        const right = point.clone().add(perpendicular.clone().multiplyScalar(-markingWidth / 2));

        left.y += 0.01; // Slightly above road surface
        right.y += 0.01;

        const baseIndex = vertices.length / 3;
        vertices.push(left.x, left.y, left.z);
        vertices.push(right.x, right.y, right.z);

        if (baseIndex >= 2) {
          indices.push(baseIndex - 2, baseIndex - 1, baseIndex);
          indices.push(baseIndex - 1, baseIndex + 1, baseIndex);
        }
      }

      distance += segmentLength;
    }

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  }, [curve, segments]);

  return (
    <group>
      {/* Main road surface */}
      <mesh ref={roadRef} geometry={roadGeometry} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.9}
          metalness={0.05}
          side={DoubleSide}
        />
      </mesh>

      {/* Lane markings */}
      <mesh ref={laneMarkingsRef} geometry={laneMarkingsGeometry}>
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Road edges */}
      <mesh geometry={roadGeometry} position={[0, -0.02, 0]}>
        <meshStandardMaterial
          color="#333333"
          roughness={0.7}
          metalness={0.1}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Enhanced Landscape Background with full coverage
const LandscapeBackground = () => {
  return (
    <group>
      {/* Enhanced Sky with full coverage */}
      <Sky
        distance={450000}
        sunPosition={[100, 20, 100]}
        inclination={0.6}
        azimuth={0.25}
        rayleigh={1}
        turbidity={8}
        mieCoefficient={0.005}
        mieDirectionalG={0.7}
      />

      {/* Full grassland ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[300, 300]} />
        <meshLambertMaterial color="#228B22" />
      </mesh>

      {/* Distant mountain range - full horizon coverage */}
      <group position={[0, -1, -120]}>
        {Array.from({ length: 20 }, (_, i) => {
          const x = (i - 10) * 15;
          const height = 20 + (i % 3) * 8;
          const width = 8 + (i % 2) * 4;
          return (
            <mesh key={i} position={[x, height/2, -10 - (i % 4) * 5]}>
              <coneGeometry args={[width, height, 8]} />
              <meshLambertMaterial color="#4169E1" />
            </mesh>
          );
        })}
      </group>

      {/* Mid-distance hills - layered coverage */}
      <group position={[0, -1, -80]}>
        {Array.from({ length: 25 }, (_, i) => {
          const x = (i - 12) * 12;
          const z = -5 - (i % 3) * 8;
          const size = 6 + (i % 2) * 3;
          return (
            <mesh key={i} position={[x, size/2, z]}>
              <sphereGeometry args={[size, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshLambertMaterial color="#32CD32" />
            </mesh>
          );
        })}
      </group>

      {/* Enhanced cloud coverage across the sky */}
      <group>
        {Array.from({ length: 15 }, (_, i) => {
          const x = (i - 7) * 25;
          const y = 25 + (i % 3) * 8;
          const z = -40 - (i % 4) * 15;
          return (
            <Cloud
              key={i}
              position={[x, y, z]}
              speed={0}
              opacity={0.7}
              width={15 + (i % 2) * 5}
              depth={10 + (i % 2) * 3}
              segments={20}
            />
          );
        })}
      </group>

      {/* Dense forest coverage - positioned away from road */}
      <group>
        {Array.from({ length: 60 }, (_, i) => {
          const angle = (i / 60) * Math.PI * 2;
          const minDistance = 25; // Minimum distance from road center
          const distance = minDistance + (i % 4) * 10;
          const x = Math.cos(angle) * distance;
          const z = Math.sin(angle) * distance;
          const trunkHeight = 3 + (i % 2);
          const foliageSize = 2 + (i % 3) * 0.5;

          return (
            <group key={i} position={[x, -1, z]}>
              {/* Tree trunk */}
              <mesh position={[0, trunkHeight/2, 0]}>
                <cylinderGeometry args={[0.3, 0.5, trunkHeight, 8]} />
                <meshLambertMaterial color="#8B4513" />
              </mesh>
              {/* Tree foliage */}
              <mesh position={[0, trunkHeight + foliageSize/2, 0]}>
                <sphereGeometry args={[foliageSize, 8, 6]} />
                <meshLambertMaterial color="#228B22" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Additional scattered trees for depth - positioned away from road path */}
      <group>
        {Array.from({ length: 40 }, (_, i) => {
          // Position trees away from the S-curve road path
          let x, z;
          if (i % 2 === 0) {
            // Trees on the left side of the road
            x = -30 - (i % 5) * 8;
            z = (i - 20) * 3;
          } else {
            // Trees on the right side of the road
            x = 30 + (i % 5) * 8;
            z = (i - 20) * 3;
          }

          const scale = 0.8 + (i % 3) * 0.3;

          return (
            <group key={i} position={[x, -1, z]} scale={scale}>
              <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.4, 0.6, 4, 8]} />
                <meshLambertMaterial color="#654321" />
              </mesh>
              <mesh position={[0, 5, 0]}>
                <sphereGeometry args={[2.5, 8, 6]} />
                <meshLambertMaterial color="#006400" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Flower patches for color variety */}
      <group>
        {Array.from({ length: 20 }, (_, i) => {
          const x = (i - 10) * 8 + (i % 3) * 5;
          const z = (i % 4) * 10 - 15;
          const colors = ['#FF69B4', '#FFD700', '#FF4500', '#9370DB', '#00CED1'];

          return (
            <mesh
              key={i}
              position={[x, -0.8, z]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <circleGeometry args={[1.5, 8]} />
              <meshLambertMaterial
                color={colors[i % colors.length]}
                transparent
                opacity={0.8}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// Simplified Particle System - temporarily disabled to avoid errors
const ParticleSystem = () => {
  // Return null to disable particles temporarily
  return null;
};

// Enhanced Animated Car with particle effects and smooth movement
const AnimatedCar = ({ progress, curve, onReachCheckpoint }) => {
  const carRef = useRef();
  const car = useGLTF('./car_3d_model/scene.gltf');
  const [currentCheckpoint, setCurrentCheckpoint] = useState(-1);

  const [prevProgress, setPrevProgress] = useState(0);

  useFrame((_, delta) => {
    if (carRef.current && curve) {
      // Smooth progress interpolation
      const targetProgress = progress;
      const currentProgress = prevProgress + (targetProgress - prevProgress) * delta * 5;
      setPrevProgress(currentProgress);

      // Get position and tangent along curve
      const position = curve.getPoint(currentProgress);
      const tangent = curve.getTangent(currentProgress);

      // Set car position with smooth transition
      const targetPosition = position.clone();
      targetPosition.y += 0.25;

      carRef.current.position.lerp(targetPosition, delta * 8);

      // Fixed rotation to face direction of movement
      const lookAtPoint = position.clone().add(tangent);
      lookAtPoint.y = carRef.current.position.y;

      // Calculate rotation manually to avoid upside-down issues
      const direction = tangent.clone().normalize();
      const angle = Math.atan2(direction.x, direction.z);
      carRef.current.rotation.y = angle;

      // Reset other rotations to keep car upright
      carRef.current.rotation.x = 0;
      carRef.current.rotation.z = 0;

      // Check for checkpoint reached
      const checkpointIndex = Math.floor(currentProgress * experiences.length);
      if (checkpointIndex !== currentCheckpoint && checkpointIndex < experiences.length) {
        setCurrentCheckpoint(checkpointIndex);
        onReachCheckpoint(checkpointIndex, position);
      }
    }
  });

  return (
    <group>
      <group ref={carRef}>
        <primitive
          object={car.scene}
          scale={3.024}
          position={[0, 0, 0]}
          castShadow
        />



        {/* Car headlights */}
        <pointLight
          position={[0.3, 0.1, 0.8]}
          intensity={0.5}
          distance={5}
          color="#ffffff"
          castShadow
        />
        <pointLight
          position={[-0.3, 0.1, 0.8]}
          intensity={0.5}
          distance={5}
          color="#ffffff"
          castShadow
        />
      </group>

      {/* Particle system for exhaust - temporarily disabled */}
      <ParticleSystem />
    </group>
  );
};

// Enhanced Experience Markers with detailed 3D checkpoints - reversed positions
const ExperienceMarkers = ({ experiences, curve, onMarkerClick }) => {
  return (
    <>
      {experiences.map((experience, index) => {
        const t = (experiences.length - 1 - index) / (experiences.length - 1); // Reversed position
        const position = curve.getPoint(t);

        return (
          <group key={index} position={[position.x, position.y + 4.5, position.z]}>
            {/* Main checkpoint marker */}
            <mesh
              onClick={() => onMarkerClick(index, position)}
              onPointerOver={(e) => {
                e.object.scale.setScalar(1.3);
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                e.object.scale.setScalar(1);
                document.body.style.cursor = 'default';
              }}
              castShadow
            >
              <cylinderGeometry args={[0.8, 0.8, 0.3, 12]} />
              <meshStandardMaterial
                color="#915EFF"
                emissive="#915EFF"
                emissiveIntensity={0.4}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Floating info panel background */}
            <mesh
              position={[0, 2.3, 0]}
              rotation={[0, Math.PI * 0.17, 0]}
              onClick={() => onMarkerClick(index, position)}
              onPointerOver={(e) => {
                e.object.material.opacity = 0.9;
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={(e) => {
                e.object.material.opacity = 0.8;
                document.body.style.cursor = 'default';
              }}
            >
              <planeGeometry args={[6, 2.8]} />
              <meshStandardMaterial
                color="#1a1a1a"
                transparent
                opacity={0.8}
                side={DoubleSide}
              />
            </mesh>

            {/* Job title - Primary position */}
            <Text
              fontSize={0.6}
              color="#915EFF"
              anchorX="center"
              anchorY="middle"
              position={[0, 3.0, 0.01]}
              maxWidth={5.5}
              rotation={[0, Math.PI * 0.17, 0]}
              font="bold"
            >
              {experience?.title || 'Position'}
            </Text>

            {/* Company name - Secondary */}
            <Text
              fontSize={0.4}
              color="#CCCCCC"
              anchorX="center"
              anchorY="middle"
              position={[0, 2.5, 0.01]}
              maxWidth={5.5}
              rotation={[0, Math.PI * 0.17, 0]}
              font="bold"
            >
              {experience?.company_name || 'Company'}
            </Text>

            {/* Timeline/Duration - Tertiary */}
            <Text
              fontSize={0.35}
              color="#888888"
              anchorX="center"
              anchorY="middle"
              position={[0, 2.0, 0.01]}
              maxWidth={5.5}
              rotation={[0, Math.PI * 0.17, 0]}
              font="bold"
            >
              {experience?.date || 'Date'}
            </Text>

            {/* Enhanced glowing effect - larger */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.4, 16, 16]} />
              <meshBasicMaterial
                color="#915EFF"
                transparent
                opacity={0.15}
              />
            </mesh>

            {/* Pulsing ring effect - larger */}
            <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1, 1.6, 16]} />
              <meshBasicMaterial
                color="#915EFF"
                transparent
                opacity={0.3}
                side={DoubleSide}
              />
            </mesh>

            {/* Vertical beam connecting to ground - adjusted for lower markers */}
            <mesh position={[0, -4, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
              <meshBasicMaterial
                color="#915EFF"
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        );
      })}
    </>
  );
};

// Enhanced Timeline3D with S-curve and manual camera control
const Timeline3D = ({ progress, onCheckpointReached, onMarkerClick }) => {

  // Create S-curve path - stretched to full container length
  const curve = useMemo(() => {
    const points = [];
    const totalLength = 40; // Much longer to fully stretch across container
    const amplitude = 10;   // Increased amplitude for better proportions
    const frequency = 0.2;  // Further reduced frequency for smoother, longer curves

    for (let i = 0; i < experiences.length; i++) {
      const t = i / (experiences.length - 1);
      const x = (t - 0.5) * totalLength;
      const z = Math.sin(t * Math.PI * frequency * 4) * amplitude * Math.sin(t * Math.PI);
      const y = 0;
      points.push(new Vector3(x, y, z));
    }

    return new CatmullRomCurve3(points);
  }, []);

  // 60-degree angle drone camera for optimal visibility
  const DroneCamera = () => {
    const { camera } = useThree();

    useFrame(() => {
      // Get current car position along the curve
      const carPosition = curve.getPoint(progress);

      // 60-degree angle positioning (steeper than 45 degrees) - zoomed out by 10%
      const cameraHeight = 13.2; // Increased height by 10% for zoom out
      const followDistance = 8.8; // Increased distance by 10% for zoom out
      const followOffsetX = 0; // Centered on car's X position

      // Position camera at 60-degree angle behind and above the car
      camera.position.x = carPosition.x + followOffsetX;
      camera.position.y = cameraHeight;
      camera.position.z = carPosition.z + followDistance;

      // Look at the car and markers at 60-degree angle - centered on cards
      camera.lookAt(carPosition.x, carPosition.y + 3, carPosition.z);
    });

    return null;
  };

  return (
    <Canvas
      camera={{ position: [0, 25, 5], fov: 60 }} // Top-down view position
      style={{ height: '600px' }}
      shadows
    >
      {/* Enhanced lighting for full landscape */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight
        position={[100, 80, 50]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={300}
        shadow-camera-left={-150}
        shadow-camera-right={150}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      />
      <hemisphereLight
        skyColor="#87CEEB"
        groundColor="#228B22"
        intensity={0.8}
      />
      <pointLight position={[0, 15, 0]} intensity={0.3} color="#FFD700" />
      <pointLight position={[-30, 10, -20]} intensity={0.2} color="#915EFF" />
      <pointLight position={[30, 10, -20]} intensity={0.2} color="#00CED1" />

      {/* Landscape Background */}
      <LandscapeBackground />

      {/* Light fog for atmosphere */}
      <fog attach="fog" args={['#87CEEB', 80, 200]} />

      {/* Road surface */}
      <RoadSurface curve={curve} />

      {/* Animated car */}
      <AnimatedCar
        progress={progress}
        curve={curve}
        onReachCheckpoint={onCheckpointReached}
      />

      {/* Experience markers */}
      <ExperienceMarkers
        experiences={experiences}
        curve={curve}
        onMarkerClick={onMarkerClick}
      />

      {/* Ground plane removed for cleaner look */}

      {/* Drone camera controller */}
      <DroneCamera />

      {/* Camera controls disabled - fully automated drone view */}


    </Canvas>
  );
};

const ExperienceTimeline = () => {
  const [progress, setProgress] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3 });

  // Auto-play animation when in view - fixed to go from past to present
  useEffect(() => {
    let interval;
    if (inView) {
      interval = setInterval(() => {
        setProgress(prev => prev >= 1 ? 0 : prev + 0.003); // Progression from 0 (past) to 1 (present)
      }, 80); // Slower interval
    }
    return () => clearInterval(interval);
  }, [inView]);

  const handleCheckpointReached = () => {
    // Simplified - no experience tracking needed
  };

  const handleMarkerClick = (index) => {
    setProgress(index / (experiences.length - 1));
  };

  return (
    <div ref={ref} className="px-4 sm:px-6 lg:px-8">
      {/* Enhanced 3D Timeline */}
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.75)}
        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-black-100 to-black-200 rounded-[20px] sm:rounded-[30px] p-3 sm:p-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 16, 16, 0.9) 0%, rgba(32, 32, 32, 0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-[20px] sm:rounded-[30px]" />

        <Timeline3D
          progress={progress}
          onCheckpointReached={handleCheckpointReached}
          onMarkerClick={handleMarkerClick}
        />
      </motion.div>
    </div>
  );
};

export default ExperienceTimeline;