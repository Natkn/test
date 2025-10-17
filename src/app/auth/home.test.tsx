import { mockLoginApi } from "../mock/mockApi";

test('выбрасывается ошибка Network error', async () => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.05);

  await expect(mockLoginApi({ email: 'correct@ex.com', password: '12345' })).rejects.toThrow('Network error, please try again');

  jest.spyOn(global.Math, 'random').mockRestore();
});

test('выбрасывается ошибка Server error', async () => {
  const mockRandom = jest.fn()
    .mockReturnValueOnce(0.15)  
    .mockReturnValueOnce(0.03); 

  jest.spyOn(global.Math, 'random').mockImplementation(mockRandom);

  await expect(mockLoginApi({ email: 'correct@ex.com', password: '12345' })).rejects.toThrow('Server error, please contact support');

  jest.spyOn(global.Math, 'random').mockRestore();
});