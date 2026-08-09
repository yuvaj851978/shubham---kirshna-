export const getInquiries = () => {
  const data = localStorage.getItem('krishnam_inquiries');
  return data ? JSON.parse(data) : [];
};

export const addInquiry = (inquiry) => {
  const inquiries = getInquiries();
  const newInquiry = {
    ...inquiry,
    id: Date.now(),
    date: new Date().toISOString(),
    status: 'new'
  };
  inquiries.unshift(newInquiry);
  localStorage.setItem('krishnam_inquiries', JSON.stringify(inquiries));
  return newInquiry;
};

export const markAsSeen = (id) => {
  const inquiries = getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  if (index !== -1) {
    inquiries[index].status = 'seen';
    localStorage.setItem('krishnam_inquiries', JSON.stringify(inquiries));
  }
};
