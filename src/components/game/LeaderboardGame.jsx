function LeaderBoardGame() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Update whole room
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Title order={4}>LeaderBoard</Title>
      
    </div>
  );
}

export default LeaderBoardGame;