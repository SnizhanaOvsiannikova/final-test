import { LoadingWrap, Animation } from '@/styles/loading_screen.styles';

const LoadingScreen = () => {
  return (
    <LoadingWrap>
      <Animation/>
      <div>Restoring your work...</div>
      <style></style>
    </LoadingWrap>
  );
};

export default LoadingScreen;
