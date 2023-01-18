const goErrorHandler = async (callback) => {
  try {
    const data = await callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

module.exports = goErrorHandler;
