const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const fetchCourseDetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      setError('Error fetching course details');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/courses/${id}/progress`);
      setProgress(response.data.progress);
    } catch (error) {
      setError('Error fetching progress');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCourseDetails(id);
      fetchProgress(id);
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  const StudentPortal = dynamic(() => import('./StudentPortal'), { ssr: false });
  const TakeExamButton = dynamic(() => import('./TakeExamButton'), { ssr: false });

  return (
    <div className="container mx-auto py-8 bg-gray-900 text-white">
      <h2 className="text-2xl font-bold mb-4 text-gray-100">{course.title}</h2>
      <p className="text-gray-300 mb-4">{course.description}</p>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2 text-gray-100">Course Modules</h3>
        <ul className="list-disc list-inside">
          {course.modules.map((module) => (
            <li key={module.id} className="mb-2 text-gray-300">
              {module.title}
            </li>
          ))}
        </ul>
        <div className="mt-4 text-gray-300">
          <p>Progress: {progress} modules completed out of {course.modules.length}</p>
        </div>
        <TakeExamButton courseId={id} />
      </div>
      <StudentPortal studentId={course.studentId} />
    </div>
  );
};

export default CourseDetails;
