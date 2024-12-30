import Api from "./api";

export const searchControlPanels = async () => {
  const items = Array(50)
    .fill(null)
    .map(() => {
      return {
        id: Math.floor(Math.random() * 1000),
        name: "Test " + Math.floor(Math.random() * 1000),
        avatar: ["🤖", "👩‍💻", "🧑‍🔧", "🎨", "🚀"][Math.floor(Math.random() * 5)],
        description: [
          "Xin chào bạn!",
          "Hello there!",
          "Xin chào quý khách, tôi là Hương từ bộ phận Chăm sóc Khách hàng của SITC Line. Rất vui được hỗ trợ quý khách hôm nay. Quý khách có thể chọn các nội tư vấn dưới đây, hoặc gõ câu hỏi để chúng tôi có thể hỗ trợ",
          "Xin chào, tôi có thể giúp bạn tư vấn thuế thu nhập cá nhân và ôn tập để thi Đại lý môn pháp luật Thuế. Hãy cho tôi biết tình huố‌‌ng bạn đang gặp phả‌i hoặc nội dung bạn muốn ôn tập",
          "Salut!",
        ][Math.floor(Math.random() * 5)],
      };
    });

  return {
    code: "NHK",
    data: {
      total: items.length,
      items: items,
    },
    message: "Thanh cong",
  };
};


export const addAgent = async (data: any) => {
  return await Api({
    url: `/cbot/v1/agents`,
    method: 'post',
    data,
  })
}
export const getAgent = async () => {
  return await Api({
    url: `/cbot/v1/agents`,
    method: 'get',
  })
}

