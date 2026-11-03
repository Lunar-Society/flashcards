// Email signups still go to Substack, which sends the newsletter and
// hosts the podcast feed.
export function Subscribe() {
  return (
    <p className="text-[1.15rem] leading-snug">
      New episodes and essays by email:{" "}
      <a href="https://www.dwarkesh.com/subscribe" className="link">
        subscribe on Substack ↗
      </a>
    </p>
  );
}
