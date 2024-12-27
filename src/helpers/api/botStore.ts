export const searchBotStore = async () => {
  const aiTypes = ["Chat Bot", "Image Generator", "Code Assistant", "Writing Assistant", "Translation Bot"];
  const aiNames = ["GPT-4 Turbo", "DALL-E 3", "Copilot Pro", "Claude 3", "Gemini Advanced"];
  const images = Array(50).fill(null).map(() =>
    `https://source.unsplash.com/300x300/?technology,AI,robot`
  );

  const items = Array(50)
    .fill(null)
    .map(() => {
      const isFree = Math.random() > 0.6;
      const price = isFree ? 0 : Math.floor(Math.random() * 50 + 10) * 100000; 
      
      return {
        name: aiNames[Math.floor(Math.random() * aiNames.length)],
        type: aiTypes[Math.floor(Math.random() * aiTypes.length)],
        avatar: ["🤖", "👩‍💻", "🧑‍🔧", "🎨", "🚀"][Math.floor(Math.random() * 5)],
        description: [
          "Trợ lý AI thông minh giúp bạn tạo và chỉnh sửa hình ảnh với độ chính xác cao",
          "Chat bot thông minh có khả năng trò chuyện tự nhiên và hỗ trợ đa ngôn ngữ",
          "Công cụ hỗ trợ lập trình viên với khả năng phân tích và tối ưu code",
          "Trợ lý viết lách chuyên nghiệp, hỗ trợ tạo content đa dạng",
          "AI dịch thuật thông minh với độ chính xác cao cho nhiều ngôn ngữ",
        ][Math.floor(Math.random() * 5)],
        price: price,
        isFree: isFree,
      };
    });

  return {
    code: "SUCCESS",
    data: {
      total: items.length,
      items: items,
    },
    message: "Thành công",
  };
};
