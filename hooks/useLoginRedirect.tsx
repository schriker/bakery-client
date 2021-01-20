import { useMeQuery } from '../generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

export default function useLoginRedirect() {
  const router = useRouter();
  const { data, loading } = useMeQuery({});

  useEffect(() => {
    if (!loading && !data) {
      router.push('/logowanie');
    }
  }, [loading, data]);
}
