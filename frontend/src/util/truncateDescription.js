const truncateDescription = (description) => {
    if (description.length > 30) {
      return description.substring(0, 30) + '...';
    }
  
    return description;
  };
  
  export default truncateDescription;